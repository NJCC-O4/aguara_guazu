'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const properties = require('./src/config/properties'); 
const router = express.Router();
const app = express();

// Configuración de middleware
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.options('*', cors());

// Rutas
const authRoutes = require('./src/app/auth/auth.routes');
const customerRoutes = require('./src/app/customers/customers.routes')
const paqueteRoutes =require('./src/app/paquetes/paquetes.routes')
const cuentasRoutes =require('./src/app/cuentas/cuentas.routes')


app.use(express.static(path.join(__dirname, 'public')));

// Configuración de rutas
authRoutes(router);
customerRoutes(router)
paqueteRoutes(router)
cuentasRoutes(router)


app.use('/api', router);
app.use(router);

// Iniciar el servidor
const server = app.listen(properties.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${properties.PORT}`);
});

module.exports = server;
