module.exports = function () {
  return function (req, res, next) {
    res.locals.user = req.session.user || req.user;
    next();
  };
};
