const cubeService = require('../services/cubeService');

module.exports = {
    getCreateForm: (req, res) => {
        res.render('create');
    },

    createCube: (req, res) => {
        cubeService.create({ ...req.body, creatorId: req.user.id })
            .then(() => {
                res.redirect('/');
            })
            .catch(e => console.log(e));
    },

    getDetails: (req, res) => {
        const { id } = req.params;
        cubeService.getOneWithAccessories(id)
            .then((cube) => {
                const { user } = req;
                if (user && user.id === cube.creatorId.toString()) {
                    res.render('details', { ...cube, user });
                } else {
                    res.render('details', { ...cube, });
                }
            })
            .catch(e => console.log(e))
    },

    getCubes: (req, res) => {
        if (Object.values(req.query).length > 0) {
            if (Object.values(req.query).every(v => v === '')) {
                res.redirect('/');
            }

            cubeService.getAll(req.query)
                .then((cubes) => {
                    console.log(cubes);
                    if (cubes.length > 0) {
                        res.render('index', { cubes });
                    } else {
                        res.render('index', { noMatches: true });
                    }
                })
                .catch(e => console.log(e));
        } else {
            cubeService.getAll()
                .then((cubes) => {
                    res.render('index', { cubes });
                })
                .catch(e => console.log(e));
        }
    },

    getEditForm: async (req, res) => {
        try {
            const { id } = req.params;
            const cube = await cubeService.getOne(id);
            const defaultValue = {
                1: '1 - Very Easy',
                2: '2 - Easy',
                3: '3 - Medium(Standard 3x3)',
                4: '4 - Intermediate',
                5: '5 - Expert',
                6: '6 - Hardcore'
            }[cube.difficulty];

            res.render('edit-cube', { ...cube, defaultValue });
        } catch (err) {
            console.log(err);
        }
    },

    editCube: (req, res) => {
        const { id } = req.params;

        cubeService.update(id, req.body)
            .then(() => res.redirect(`/details/${id}`))
            .catch(e => console.log(e));
    },

    getDeleteForm: async (req, res) => {
        const { id } = req.params;
        const cube = await cubeService.getOne(id);
        const defaultValue = {
            1: '1 - Very Easy',
            2: '2 - Easy',
            3: '3 - Medium(Standard 3x3)',
            4: '4 - Intermediate',
            5: '5 - Expert',
            6: '6 - Hardcore'
        }[cube.difficulty];

        res.render('delete-cube', { ...cube, defaultValue });
    },

    deleteCube: (req, res) => {
        const { id } = req.params;

        cubeService.delete(id)
            .then(() => res.redirect('/'))
            .catch(e => console.log(e));
    }
};