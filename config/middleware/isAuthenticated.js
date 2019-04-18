// Middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }
  // If the user isn't logged in, redirect them to the login page -- root route
  // Any page that is hit requiring authentication will redirect to the root rout
  return res.redirect("/");
};
