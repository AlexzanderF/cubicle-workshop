const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');
const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');

module.exports = {
    getCreateForm: (req, res) => {
        res.render('create-accessory');
    },

    createAccessory: async (req, res) => {
        try {
            await accessoryService.create(req.body);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.render('create-accessory', { error: err.message, ...req.body });
        }
    },

    getAttachAccessory: async (req, res) => {
        const { id } = req.params;
        try {
            const cube = await Cube.findById(id).lean();
            const accessories = await accessoryService.getByQuery({
                cubes: { $nin: cube._id }
            });

            res.render('attach-accessory', { cube, accessories });
        } catch (err) {
            console.log(err);
        }

    },

    postAttachAccessory: async (req, res) => {
        try {
            const { id } = req.params;
            const { accessory } = req.body;
            const accessoryObj = (await accessoryService.getByQuery({ name: accessory }))[0];

            await accessoryObj.update({ $push: { 'cubes': id } });

            cubeService.update(id, { $push: { 'accessories': accessoryObj._id } })
                .then((cube) => {
                    console.log(cube);
                    res.redirect('/');
                })
                .catch(e => console.log(e));
        } catch (err) {
            console.log(err);
        }
    }
};