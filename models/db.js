const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fullwebsite',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = db;
