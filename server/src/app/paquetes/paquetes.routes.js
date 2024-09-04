const paquetesController = require('./paquetes.controller');

// Definir rutas para autenticación


module.exports = (router) => {
    router.get('/api/paquetes/getAll', paquetesController.getAll);
    router.post('/api/paquetes/add', paquetesController.add);
    router.put('/api/paquetes/update/:id', paquetesController.update);
    router.delete('/api/paquetes/delete/:id', paquetesController.delete);
};
