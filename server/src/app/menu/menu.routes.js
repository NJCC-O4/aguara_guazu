const menu = require('./menu.controller');


module.exports = (router) => {
    router.get('/api/menu/test', menu.test);

}