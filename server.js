/*******  START: EXPRESS.JS MIDDLEWARE IMPORTS  *******/
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var methodOverride = require("method-override");
/*******  END: EXPRESS.JS MIDDLEWARE IMPORTS  *******/


/*******  START: LOAD .env VARIABLES FOR DATABASE CONFIG  *******/
require("dotenv").config();
require("./config/database");
/*******  END: LOAD .env VARIABLES  *******/


/*******  START: CREATE THE EXPRESS APP  *******/
var app = express();
/*******  END: CREATE THE EXPRESS APP  *******/


/*******  START: LOAD PASSPORT  *******/
require("./config/passport");
/*******  END: LOAD PASSPORT  *******/


/*******  START: CREATE ROUTERS  *******/
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var applicationsRouter = require('./routes/applications');
var followsRouter = require('./routes/follows');
/*******  START: CREATE ROUTERS  *******/


/*******  START: VIEW ENGINE SETUP  *******/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*******  END: VIEW ENGINE SETUP  *******/


/*******  START: ATTACH ADDITIONAL MIDDLEWARE TO APP  *******/
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
/*******  END: ATTACH ADDITIONAL MIDDLEWARE TO APP  *******/


/*******  START: ATTACH SESSION MIDDLEWARE TO APP  *******/
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {sameSite: "lax"},
  })
);
/*******  END: ATTACH SESSION MIDDLEWARE TO APP  *******/


/*******  START: ATTACH PASSPORT MIDDLEWARE TO APP  *******/
app.use(passport.initialize());
app.use(passport.session());
/*******  END: ATTACH PASSPORT MIDDLEWARE TO APP  *******/


/*******  START: ATTACH ROUTERS TO APP  *******/
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/applications", applicationsRouter);
app.use('/follows', followsRouter);
/*******  END: ATTACH ROUTERS TO APP  *******/


/*******  START: 404 AND ERROR HANDLING  *******/
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
/*******  END: 404 AND ERROR HANDLING  *******/

module.exports = app;
