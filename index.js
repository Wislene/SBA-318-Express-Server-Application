
// import express from 'express' ;
const express = require('express');
import bodyParser from 'body-parser' ;

const app = express();
const PORT = 5000; 

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port: http://localhost${PORT}`));

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
app.use(express.static(path.join(__dirname, 'data')));

// Middleware for logging requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
});

// Use the routers
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
