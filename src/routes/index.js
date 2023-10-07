const express = require("express");
const router = express.Router();
const fs = require('fs');

const PATH_ROUTER = __dirname;

//TODO video.js
const cleanFileName = (fileName) => {
    const clean = fileName.split('.').shift(); //TODO [video, js]
    return clean;
}

//TODO [index.js, video.js]
fs.readdirSync(PATH_ROUTER).filter(fileName=> {

    const prefixRoute = cleanFileName(fileName);
    if(prefixRoute !== "index") {
        console.log(`Cargando la ruta... ${prefixRoute}`);
        router.use(`/${prefixRoute}`,( require(`./${prefixRoute}.js`)));
    }
});

//cambio muy pequeño de Patron de Inversion de control pero es muy poderoso para usar servidor de prueba
module.exports = app => app.use('/v1', router);

//module.exports = {router};