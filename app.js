const express = require("express");
const path = require("path");

const session = require("express-session");
// Load Passport
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const Rollbar = require("rollbar");
const rollbar = new Rollbar("e752d9d0d9b0426a83a74b354d100be8");

const userInViews = require("./lib/middleware/userInViews");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const routes = require("./routes/router");

const app = express();
const port = 3000;

require("dotenv").config();

app.set("view engine", "pug");

// config express-session
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;
}

app.use(session(sessionConfig));

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
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
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(userInViews());
app.use("/", adminRouter);
app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", routes);

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`ourbackyard listening on port ${port}!`));
