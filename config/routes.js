const cubesController = require('../controllers/cubes');
const accessoriesController = require('../controllers/accessories');
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

module.exports = (app) => {
    app.use(auth());

    app.get('/', cubesController.getCubes);

    app.get('/create', isAuthenticated, cubesController.getCreateForm);
    app.post('/create', isAuthenticated, cubesController.createCube)

    app.get('/details/:id', cubesController.getDetails);

    app.get('/edit/:id', isAuthenticated, cubesController.getEditForm);
    app.post('/edit/:id', isAuthenticated, cubesController.editCube);

    app.get('/delete/:id', isAuthenticated, cubesController.getDeleteForm);
    app.post('/delete/:id', isAuthenticated, cubesController.deleteCube);

    app.get('/create/accessory', isAuthenticated, accessoriesController.getCreateForm);
    app.post('/create/accessory', isAuthenticated, accessoriesController.createAccessory);

    app.get('/attach/accessory/:id', isAuthenticated, accessoriesController.getAttachAccessory);
    app.post('/attach/accessory/:id', isAuthenticated, accessoriesController.postAttachAccessory);

    app.get('/login', isGuest, usersController.getLoginForm);
    app.post('/login', isGuest, usersController.loginUser);

    app.get('/register', isGuest, usersController.getRegisterForm);
    app.post('/register', isGuest, usersController.registerUser);

    app.get('/logout', isAuthenticated, usersController.logout);

    app.get('/about', (req, res) => {
        res.render('about');
    });
    app.all('*', (req, res) => {
        res.render('404');
    });
};