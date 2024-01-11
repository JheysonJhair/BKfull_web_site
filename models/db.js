const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'ccontrolz.com',
  user: 'nibcqvah_jhair',
  password: '201054Jhair.',
  database: 'nibcqvah_FullWebSite',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = db;
