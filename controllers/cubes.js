const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

module.exports = {
    getCreateForm: (req, res) => {
        res.render('create');
    },

    createCube: (req, res) => {
        new Cube(req.body).save()
            .then(() => {
                res.redirect('/');
            })
            .catch(e => console.log(e));
    },

    getDetails: (req, res) => {
        const { id } = req.params;
        Cube.findById(id)
            .populate('accessories')
            .lean()
            .then((cube) => {
                res.render('details', { ...cube });
            })
            .catch(e => console.log(e));
    },

    getCubes: (req, res) => {
        if (Object.values(req.query).length > 0) {
            if (Object.values(req.query).every(v => v === '')) {
                res.redirect('/');
            }

            const { search, from, to } = req.query;

            Cube.find({
                name: search ? new RegExp(search, 'gi') : /^.+$/g,
                difficulty: { $gte: from || 0, $lte: to || 6 }
            }).lean()
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
            Cube.find({}).lean()
                .then((cubes) => {
                    res.render('index', { cubes });
                })
                .catch(e => console.log(e));
        }
    }
};