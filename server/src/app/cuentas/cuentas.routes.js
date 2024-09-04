const cuentasController = require('./cuentas.controller');

module.exports = (router) => {
    router.get('/api/customers', cuentasController.getAll);
    router.get('/api/customers/paquetes', cuentasController.getPaquetes);
    router.get('/api/customers/:id', cuentasController.getById);
    router.post('/api/customers/create', cuentasController.create);
    router.put('/api/customers/update/:id', cuentasController.update);
    router.put('/api/customers/updatepay/:id', cuentasController.updatepay);
    router.delete('/api/customers/delete/:id', cuentasController.delete);
};
