require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var passport = require("./config/passport");
var routes = require("./routes/index");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(flash());
// app.use(session({ secret: "keyboard", cookie: { maxAge: 6000000 } }));

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

// Routes
//Api Routes
var apiRoutes = require("./routes/apiRoutes");

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: "asjndbewjiujknajd83",
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(apiRoutes);
app.use(routes);

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// });

module.exports = app;
