require("dotenv").config();
const express = require('express');
const app = module.exports = express();
const session = require('express-session');
const MySqlStore = require("express-mysql-session")(session);
const pool = require("../config/connectionBD");


const sessionStore = new MySqlStore({}/* session store options */, pool);

app.use(session({
	genid: function(req) {
		return genuuid() // use UUIDs for session IDs
	  },
    key:'SESSION_COOKIE_NAME',
    secret:'SESSION_COOKIE_SECRET',
    store: sessionStore,
	resave: false,
	saveUninitialized: false
}))
// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});
sessionStore.close().then(() => {
	// Successfuly closed the MySQL session store.
	console.log('MySQLStore closed');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});