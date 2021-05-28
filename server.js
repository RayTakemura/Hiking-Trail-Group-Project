/**
 * ALL IMPORTS:
 */
// import translator
const translate = require("translate");
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
  var t3 = t2.split("%28").join("");
  var t4 = t3.split("%26").join("");
  var t5 = t4.split("%29").join("");
  var t6 = t5.split("%21").join("");
  var t7 = t6.split("%27").join("'");
  var t8 = t7.split("%C3%B1o ").join(" ");
  var t9 = t8.split("%2F").join("");
  var t10 = t9.split("%0D%0A%0D%0A").join("");
  var t11 = t10.split("%3A").join("");
  var t12 = t11.split("%27s %3Ca href%3D%22http%").join("");
  var t13 = t12.split("3A%2F%2F").join(" ");
  var t14 = t13.split("%2F").join(" ");
  var t15 = t14.split("%22%3Ewebsite%3C%2Fa%3E").join(" ");
  var t16 = t15.split("%E2%80%99").join(" ");
  var t17 = t16.split("%22%3Ewebsite%3Ca%3E").join(" ");
  var t18 = t17.split("%3Ca href%3D%22").join(" ");
  

  return t18;
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