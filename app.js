const express = require("express");
const helmet = require("helmet");
const path = require("path");

const session = require("express-session");
// Load Passport
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const Rollbar = require("rollbar");

const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");

const userInViews = require("./lib/middleware/userInViews");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const signupRouter = require("./routes/signup");
const accountRouter = require("./routes/account");
const searchRouter = require("./routes/search");
const routes = require("./routes/router");

// file deepcode ignore UseCsurfForExpress: Not using CSRF tokens currently
const app = express();
const port = 3000;

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

require("dotenv").config();

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

app.set("view engine", "pug");

let sitemap = null;

app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap);
  }

  try {
    const smStream = new SitemapStream({
      hostname: "https://www.ourbackyard.co.za/",
    });
    const pipeline = smStream.pipe(createGzip());

    // pipe your entries or directly write them.
    smStream.write({ url: "/", changefreq: "monthly", priority: 1.0 });
    smStream.write({ url: "/about", changefreq: "monthly", priority: 0.8 });
    smStream.write({ url: "/contact", changefreq: "monthly", priority: 0.8 });
    smStream.end();

    // cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    // stream write the response
    pipeline.pipe(res).on("error", (error) => {
      throw error;
    });
  } catch (error) {
    res.status(500).end();
  }
});

// config express-session
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback",
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// TODO: You can use this section to keep a smaller payload, ex. user.id
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(userInViews());
app.use("/", adminRouter);
app.use("/", authRouter);
app.use("/", signupRouter);
app.use("/", accountRouter);
app.use("/", searchRouter);
app.use("/", routes);

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`ourbackyard listening on port ${port}!`));
