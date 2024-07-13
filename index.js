// import express from 'express' ;
const express = require("express");

const app = express();

// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello from Homepage.");
});

// app.get('/', (req,res) => {
//   // console.log('[test]');
//   res.send('hello from Homepage.');
// });

// routes

// app.listen(3000);

// Come back to this one:
// console.log('Listening on Port 3000...');

const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server App Listening on port at http://localhost:${PORT}`);
});
// const express = require('express');
// const path = require('path');
// const app = express();
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// Set view engine to Pug
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Middleware to parse form data
// app.use(express.urlencoded({ extended: false }));

// Serve static files
// app.use(express.static(path.join(__dirname, 'data')));

// Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
// });

// Use the routers
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
