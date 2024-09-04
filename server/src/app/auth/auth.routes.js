const authController = require('./auth.controller');

// Definir rutas para autenticación


module.exports = (router) => {
    router.post('/api/auth/login', authController.login);
};
