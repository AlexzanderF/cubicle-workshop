const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

module.exports = {
    create: async (data) => {
        try {
            const { name, description } = data;

            if (name.length < 5) {
                throw new Error('Name should be at least 5 characters long');
            }
            if (!/^\S[\w ]+\S$/g.test(name)) {
                throw new Error('Name should consist only English letters, digits or whitespaces');
            }

            if (description.length < 20) {
                throw new Error('Description should be at least 20 characters long');
            }
            if (!/^\S[\w ]+\S$/g.test(description)) {
                throw new Error('Description should consist only English letters, digits or whitespaces');
            }

            return new Accessory(data).save();
        } catch (error) {
            throw error;
        }
    },

    getById: (id) => {
        return Accessory.findById(id).lean();
    },

    getByQuery: (query) => {
        return Accessory.find(query);
    },
};