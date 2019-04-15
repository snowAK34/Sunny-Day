require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require('express-session')
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(flash());
app.use(session({ secret: 'keyboard', cookie: { maxAge: 60000 } }))


db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("Listening on port %s", PORT)
  });
});

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
var apiRoutes = require('./routes/apiRoutes');
app.use(apiRoutes);

require("./routes/htmlRoutes")(app);

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
});

module.exports = app;