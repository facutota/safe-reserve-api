const express = require("express");
const router = express.Router();
const { getDetail, getList, createItem, updateItem, deleteItem } = require("../controllers/renthouse");

const app= express();
app.use(express.json());
//TODO http://localhost:3001/vi/user
/**
 * Lista de usuarios
 */
router.get("", getList );
router.get("/:id", getDetail );
router.post("", createItem );
router.put("/:id", updateItem );
router.delete("/:id", deleteItem );


module.exports =  router ;