// Required dependencies and imports
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var passport = require("./config/passport");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(flash());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: "asjndbewjiujknajd83",
    resave: false,
    saveUninitialized: false
  })
);

// Initializing passport and session
app.use(passport.initialize());
app.use(passport.session());

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
app.use(apiRoutes);
app.use(htmlRoutes);

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT
    );
  });
});

module.exports = app;
