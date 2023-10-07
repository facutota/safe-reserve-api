const express = require("express");
const router = express.Router();
const { getDetail, getList, createItem, updateItem, deleteItem, getImages, getRatings } = require("../controllers/house");


//TODO http://localhost:3001/vi/user
/**
 * Lista de usuarios
 */
router.get("", getList );
router.get("/:id", getDetail );
router.get("/:id/images", getImages );
router.get("/:id/ratings", getRatings );
router.post("", createItem );
router.put("/:id", updateItem );
router.delete("/:id", deleteItem );

module.exports =  router ;