const cubesController = require('../controllers/cubes');
const accessoriesController = require('../controllers/accessories');

module.exports = (app) => {
    app.get('/', cubesController.getCubes);

    app.get('/create', cubesController.getCreateForm);
    app.post('/create', cubesController.createCube)

    app.get('/create/accessory', accessoriesController.getCreateForm);
    app.post('/create/accessory', accessoriesController.createAccessory);

    app.get('/attach/accessory/:id', accessoriesController.getAttachAccessory);
    app.post('/attach/accessory/:id', accessoriesController.postAttachAccessory);

    app.get('/details/:id', cubesController.getDetails);

    app.get('/about', (req, res) => {
        res.render('about');
    });
    app.all('*', (req, res) => {
        res.render('404');
    });
};