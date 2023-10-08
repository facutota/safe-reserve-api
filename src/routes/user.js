const express = require("express");
const router = express.Router();
const { getUser, getUsers, createUser, updateUser, deleteUser, getHouses, getRentHouses } = require("../controllers/user");

const { login, logout } = require("../utils/midlewares/loginLogout")
//TODO http://localhost:3001/vi/user
/**
 * Lista de usuarios
 */
router.get("", getUsers );
router.get("/:id", getUser );
router.get("/logout", logout );
router.get("/:id/houses", getHouses );
router.get("/:id/renthouses", getRentHouses );
router.post("/signup", createUser);
router.post("/login", login);
router.put("/:id", updateUser );
router.delete("/:id", deleteUser );




module.exports =  router ;