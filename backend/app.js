
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const awsRouter = require("./routes/ec2");

var app = express();
const helmet = require("helmet");
var cors = require("cors");

app.use(helmet());
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", awsRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

// app.get('*', function(req, res){
//     res.send({status:false,message:'Route Not found'}, 404);
//   });
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API to test AWS",
        version: "1.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Madhan",
          url: "https://varadhodiyil.tech",
          email: "madhan_94@live.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );


module.exports = app;
