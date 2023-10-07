const mysql = require("mysql2/promise");
const pool = require("../config/connectionBD");


const getDetail = async function (req, res) {
    const id = req.params.id;
    query_ = `SELECT * FROM House WHERE ID_House_Pk=${mysql.escape(id)}`;

    try {
        const [results, fields] = await pool.query(query_);
        if (results.length == 0) {
            console.log("Error al obtener data o TABLA VACIA");
            res.status(300).json({ estado: true, data: [] });
        } else {
            console.log("Data good");
            res.status(200).json({
                estado: true,
                data: results,
            });
        }
    } catch (error) {
        res.status(409).send(String(error));
    }
};

const getList = async function (req, res) {
    query_ = 'SELECT * FROM House';
    try {
        const [results, fields] = await pool.query(query_);
    
        if (results.length === 0) {
          console.log("Error al obtener data o TABLA VACIA");
          res.status(300).json({ estado: true, data: [] });
        } else {
          console.log("Data good");
          res.status(200).json({
            estado: true,
            data: results,
          });
        }
      } catch (error) {
        res.status(409).send(String(error));
      }
};

const updateItem = async function (req, res) {
    const id = req.params.id;
    query_ = `UPDATE House SET ? WHERE ID_House_Pk=${mysql.escape(id)}`;
    insert = req.body;

    try {
        const [results, fields] = await pool.query(query_, insert);
        if (results.length == 0) {
            console.log("Error al obtener data o TABLA VACIA");
            res.status(300).json({ estado: true, data: [] });
        } else {
            console.log("Data good" + results);
            res.status(200).json({
                estado: true,
                data: results,
            });
        }
    } catch (error) {
        res.status(409).send(String(error));
    }
};

const createItem = async function (req, res) {
    query_ = 'INSERT INTO House SET ?';
    insert = req.body;
    console.log(insert);

    try {
        const [results, fields] = await pool.query(query_, insert);
        if (results.length == 0) {
            console.log("Error al obtener data o TABLA VACIA");
            res.status(300).json({ estado: true, data: [] });
        } else {
            console.log("Data good" + results);
            res.status(200).json({
                estado: true,
                data: results,
            });
        }
    } catch (error) {
        res.status(409).send(String(error));
    }
};

const deleteItem = async function (req, res) {
    const id = req.params.id;
    query_ = `DELETE FROM House WHERE ID_House_Pk=${mysql.escape(id)}`;

    try {
        const [results, fields] = await pool.query(query_);
        if (results.length == 0) {
            console.log("Error al obtener data o TABLA VACIA");
            res.status(300).json({ estado: true, data: [] });
        } else {
            console.log("Data good" + results);
            res.status(200).json({
                estado: true,
                data: results,
            });
        }
    } catch (error) {
        res.status(409).send(String(error));
    }
};

const getImages = async function (req, res) {
    const id = req.params.id;
    query_ = `SELECT I.* FROM House H JOIN ImagesVid I ON H.ID_House_Pk = I.HouseId_ImagesVid_Fk WHERE ID_House_Pk=${mysql.escape(id)}`;

    try {
        const [results, fields] = await pool.query(query_);
        if (results.length == 0) {
            console.log("Error al obtener data o TABLA VACIA");
            res.status(300).json({ estado: true, data: [] });
        } else {
            console.log("Data good");
            res.status(200).json({
                estado: true,
                data: results,
            });
        }
    } catch (error) {
        res.status(409).send(String(error));
    }
};

const getRatings = async function (req, res) {
    const id = req.params.id;
    query_ = `SELECT I.* FROM House H JOIN Rating I ON H.ID_House_Pk = I.HouseId_Rating_Fk WHERE ID_House_Pk=${mysql.escape(id)}`;

    try {
        const [results, fields] = await pool.query(query_);
        if (results.length == 0) {
            console.log("Error al obtener data o TABLA VACIA");
            res.status(300).json({ estado: true, data: [] });
        } else {
            console.log("Data good");
            res.status(200).json({
                estado: true,
                data: results,
            });
        }
    } catch (error) {
        res.status(409).send(String(error));
    }
};

module.exports = { getDetail, getList, createItem, updateItem, deleteItem, getImages, getRatings};