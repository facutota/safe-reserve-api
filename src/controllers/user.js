const mysql = require("mysql2/promise");
const pool = require("../config/connectionBD");
const bcrypt = require("bcrypt");

const getUser = async function (req, res) {
  const id = req.params.id;
  query_ = 'SELECT * FROM User WHERE ID_User_Pk=' + mysql.escape(id);

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

const getUsers = async function (req, res) {
  query_ = 'SELECT * FROM User';

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

const updateUser = async function (req, res) {
  const id = req.params.id;
  
  query_ = 'UPDATE User SET ? WHERE ID_User_Pk=' + mysql.escape(id);
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

const createUser = async function (req, res) {
  const name = req.body["Name_User"];
  const password = req.body["Password_User"];
  const email = req.body["Email_User"];

  console.log(name, email, password);

  try {
    const hashPs = await bcrypt.hash(password, 10);
    query_= `INSERT INTO User (Name_User, Password_User, Email_User) VALUES (${mysql.escape(name)},${mysql.escape(
      hashPs
    )},${mysql.escape(email)})`;
    console.log(hashPs);

    const results = await pool.query(query_);
    if (results.length === 0) {
      console.log("Error al obtener data o TABLA VACIA");
      res.status(300).json({ estado: true, data: [] });
    } else {
      console.log("Data good" + results);
      res.status(200).json({
        estado: true,
        data: results[0],
      });
    }
  } catch (error) {
    res.status(409).send(String(error));
  }
};

const deleteUser = async function (req, res) {
  const id = req.params.id;
  const query = 'DELETE FROM User WHERE ID_User_Pk=' + mysql.escape(id);

  try {
    const [results, fields] = await pool.query(query);

    if (results.affectedRows === 0) {
      console.log("Error al obtener data o TABLA VACIA");
      res.status(300).json({ estado: true, data: [] });
    } else {
      console.log("Data good");
      res.status(200).json({
        estado: true,
        mensaje: 'Usuario eliminado con éxito',
      });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(409).send(String(error));
  }
};

const getHouses = async function (req, res) {
  const id = req.params.id;
  query_ = `SELECT H.* FROM House H JOIN User U ON H.UserId_House_Fk = U.ID_User_Pk WHERE ID_User_Pk=${mysql.escape(id)}`;

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

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser, getHouses };
