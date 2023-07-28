const express = require('express');
const app = express();
const PORT = 3000;
const departmentsRoutes = require('./src/routes/departments');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use(express.static('public'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hola, esta es una ruta de prueba' });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

app.use('/api', departmentsRoutes);




  