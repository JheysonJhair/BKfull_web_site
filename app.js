const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo cors
const userRoutes = require('./routes/users');

const app = express();
const port = 3001;

// Agrega el middleware de CORS antes de las rutas
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
