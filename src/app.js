require("dotenv").config();
const config  = require("./config/index");

const express = require("express");
const session = require('express-session');
const MySqlStore = require("express-mysql-session")(session);
const pool = require("./config/connectionBD");
const cors = require("cors");
const { logErrors, wrapErrors, errorHandler } = require("./utils/midlewares/errorMidlewares");
const uuid = require('uuid');

const app = express();

const sessionStore = new MySqlStore({}/* session store options */, pool);

app.use(session({
	genid: function(req) {
		return uuid.v4(); // Utiliza uuid para generar un identificador único
	  },
    key: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_COOKIE_SECRET,
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
// sessionStore.close().then(() => {
// 	// Successfuly closed the MySQL session store.
// 	console.log('MySQLStore closed');
// }).catch(error => {
// 	// Something went wrong.
// 	console.error(error);
// });

const route  = require("./routes");
const notFound = require("./utils/midlewares/notFoundMidleware");
const helmet = require("helmet"); //helmet es un middleware que protege la app contra ataques de tipo xss




const PORT = config.port || 3000;

//Global Midlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }) )

//Para los test se usa un patron de diseño que se llama la Inversion del control
//app.use("/v1", router);// modificamos esto
route(app);

//Catch 404 despues de todas las rutas
app.use(notFound);

//Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(PORT, () => console.log("La api esta lista", PORT));