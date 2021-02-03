const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

module.exports = {
    create: (data) => {
        return new Accessory(data).save();
    },

    getById: (id) => {
        return Accessory.findById(id).lean();
    },

    getByQuery: (query) => {
        return Accessory.find(query);
    },
};