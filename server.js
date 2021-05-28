/**
 * ALL IMPORTS:
 */

// import path to use absolute path
const path = require('path');
// use the express npm package
const express = require('express');
// use the exported sequlize variable from connection.js
const sequelize = require('./config/connection');
// router exported by the controller folder
const router = require('./controllers');
// import express-session
const session = require('express-session');
// initialize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret', // TODO: WRITE THIS IN THE ENV FILE
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

/**
 * SET UP HANDLEBARS.JS 
 */
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
hbs.handlebars.registerHelper('splitTitle', function(title) {
  var t = title.split("%20").join(" ");
  var t2 = t.split("%2C").join(" ");
  return t2;
  // [1] + " <br/> " + t[0];
});


/**
 * INSTANTIATE SERVER:
 */

// instantiate server
const app = express();
// choose the port
const PORT = process.env.PORT || 3001;



// set handlebars as this app's template engine of choice:
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


/**
 * MIDDLEWARE (app.use()):
 */

// set up frontend to connect with handlebar files (needs to be on top of other middleware statements)
app.use(express.static(path.join(__dirname, 'public')));
// parse incoming data into JSON format
app.use(express.json());
// parse incoming URL-encoded data with the qs library
app.use(express.urlencoded({ extended: true }));
// use session
app.use(session(sess));
// use router that's exported by the controller file
app.use(router);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});