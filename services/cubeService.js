const Cube = require('../models/Cube');

module.exports = {
    getOne: (id) => {
        return Cube.findById(id).lean();
    },

    getOneWithAccessories: (id) => {
        return Cube.findById(id)
            .populate('accessories')
            .lean();
    },

    getAll: (queryParams) => {
        if (queryParams) {
            const { search, from, to } = queryParams;

            return Cube.find({
                name: search ? new RegExp(search, 'gi') : /^.+$/g,
                difficulty: { $gte: from || 0, $lte: to || 6 }
            }).lean();
        }

        return Cube.find({}).lean();
    },

    create: (data) => {
        return new Cube(data).save();
    },

    update: (id, data) => {
        return Cube.updateOne({ _id: id }, data);
    },

    delete: (id) => {
        return Cube.deleteOne({ _id: id });
    },
}