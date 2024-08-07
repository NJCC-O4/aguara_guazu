const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const properties = require('./src/config/properties'); 
const port = 3000;




//RUTAS
const menuRoute = require('./src/app/menu/menu.routes');


// Middleware
app.use(cors());
app.use(bodyParser.json());


//Rutas
const router = express.Router();
// Rutas
app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});


//PUERTO

const server = app.listen(properties.PORT);





app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Aquí iría la lógica de autenticación
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});



menuRoute(router);



app.use('/api', router)
app.use(router)




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
