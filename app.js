// app.js, Tomislav Lazovic, 301229459, 11/07/2022
//establish refs to libs
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// import "mongoose" - required for DB Access
let mongoose = require("mongoose");

// connect to mongoDB
let dbUriLocal = "mongodb://127.0.0.1/express_portfolio";
let dbUri = process.env.MONGODB_URI || dbUriLocal;
console.log("attempting to login to: " + dbUri + ".");

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Database Connected!...");
});

var indexRouter = require("./routes/index");
var buisnessContactsRouter = require("./routes/buisnessContacts");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/buisnessContacts", buisnessContactsRouter);

// catch 404 and forward to error handler
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

module.exports = app;
