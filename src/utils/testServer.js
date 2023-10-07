const express = require("express");
const supertest = require("supertest");

function testServer(route) {
    const app = express();
    route(app); //aca donde entra en juego la inversion de control 
    return supertest(app);
}

module.exports = testServer;