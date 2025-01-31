require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const sequelize = require("./connection");
const passport = require("passport");
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const problemeRouter = require("./routes/problemes");
const categorieRouter = require("./routes/categories");
const commentaireRouter = require("./routes/commentaire");
const notificationRouter = require("./routes/notifications");
const discussionRouter = require("./routes/discussion");





let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// allow-cors
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize())
app.use(express.static(__dirname + "/public"));

//routes
app.use("/dis", indexRouter);
app.use("/users", usersRouter);
app.use("/problemes", problemeRouter);
app.use("/categories", categorieRouter);
app.use("/comment", commentaireRouter);
app.use("/notification", notificationRouter);
app.use("/discussion", discussionRouter);

//uploads folder
app.use('/uploads', express.static('uploads'))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//catch unauthorized user
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
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
