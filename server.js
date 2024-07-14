const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./middlewares/logRequests");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Error handling for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON");
    return res
      .status(400)
      .send({ status: 400, message: "JSON Parsing Not Working" });
  }
  next();
});

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Custom middleware
const logRequests = require("./middlewares/logRequests");
app.use(logRequests);

// Routes
const userRoutes = require("./routes/users");
const menuRoutes = require("./routes/menus");
const commentRoutes = require("./routes/comments");

app.use("/users", userRoutes);
app.use("/menus", menuRoutes);
app.use("/users", commentRoutes);

// Error-handling
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

app.get("/", (req, res) => {
  res.render("index", { title: "Dinner Menu App" });
});

// Start the server: npx nodemon server.js

app.listen(PORT, () => {
  console.log(`Server App Listening on port at http://localhost:${PORT}`);
});
