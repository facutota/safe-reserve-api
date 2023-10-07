const mysql = require("mysql2/promise");
const pool = require("../config/connectionBD");

const getDetail = async function (req, res) {
  const id = req.params.id;
  query_ = 'SELECT * FROM Rating WHERE ID_Rating_Pk=' + mysql.escape(id);

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

const getList = async function (req, res) {
  query = `SELECT * FROM Rating`;
  try {
    const [results, fields] = await pool.query(query);

    if (results.length === 0) {
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

const updateItem = async function (req, res) {
  const id = req.params.id;
  query_ = 'UPDATE Rating SET ? WHERE ID_Rating_Pk=' + mysql.escape(id);
  insert = req.body;

  try {
    const [results, fields] = await pool.query(query_, insert);

    if (results.length === 0) {
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

  query_ = 'INSERT INTO Rating SET ?';
  insert = req.body;

  try {
    const [results, fields] = await pool.query(query_, insert);

    if (results.length === 0) {
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
  query_ = 'DELETE FROM Rating WHERE ID_Rating_Pk=' + mysql.escape(id);

  try {
    const [results, fields] = await pool.query(query_);

    if (results.length === 0) {
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

module.exports = { getDetail, getList, createItem, updateItem, deleteItem };
