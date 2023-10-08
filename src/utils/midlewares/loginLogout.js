const mysql = require("mysql2/promise");
const mysqlConnection = require("../../config/connectionBD");
const bcrypt = require("bcrypt");


const login = async function (req, res) {
  const email = req.body["Email_User"];
  const pass = req.body["Password_User"];
  console.log(email);

  query_ = 'SELECT * FROM User WHERE Email_User=' + mysql.escape(email);

  try {
    const [results, fields] = await mysqlConnection.query(query_);

    if (results.length == 0) {
      console.log('No existe el usuario');
      res.status(300).json({ login: false, data: [] });
    } else {
      const data = results[0];
      // Llama a la función de verificación de contraseñas
      const isPasswordValid = await verifyPassword(pass, data.Contrasenia_Usuario);

      if (isPasswordValid) {
        console.log('Login Exitoso');
        req.session.Email_Usuario = email;// Guarda el ID del usuario en la sesión
        console.log(req.session.Email_Usuario);
        res.status(200).json({ login: true, data: data });
      } else {
        console.log('Contraseña incorrecta');
        res.status(300).json({ login: false });
      }
    }
  } catch (error) {
    res.status(409).send(String(error));
  }
};

const logout = function (req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).json({ logout: false, error: 'Error al cerrar sesión' });
    } else {
      // La sesión se ha destruido correctamente
      console.log('Sesión cerrada correctamente');
      res.status(200).json({ logout: true });
    }
  });
};

// Función asincrónica para verificar la contraseña
async function verifyPassword(plainPassword, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { login, logout };
