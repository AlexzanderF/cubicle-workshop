const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

module.exports = {
    getCreateForm: (req, res) => {
        res.render('create-accessory');
    },

    createAccessory: (req, res) => {
        new Accessory(req.body).save()
            .then(() => {
                res.redirect('/');
            })
            .catch(e => console.log(e))
    },

    getAttachAccessory: async (req, res) => {
        const { id } = req.params;
        try {
            const cube = await Cube.findById(id).lean();
            const accessories = await Accessory.find({
                cubes: { $nin: cube._id }
            }).lean();

            res.render('attach-accessory', { cube, accessories });
        } catch (err) {
            console.log(err);
        }

    },

    postAttachAccessory: async (req, res) => {
        try {
            const { id } = req.params;
            const { accessory } = req.body;
            const accessoryObj = (await Accessory.find({ name: accessory }))[0];

            await accessoryObj.update({ $push: { 'cubes': id } });

            Cube.findByIdAndUpdate(id, { $push: { 'accessories': accessoryObj._id } })
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