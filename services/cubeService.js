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

    getAll: (query) => {
        if (query) {
            const { search, from, to } = query;

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

    edit: (id, data) => {
        return Cube.updateOne({ _id: id }, data);
    },

    delete: (id) => {
        return Cube.deleteOne({ _id: id });
    }
}