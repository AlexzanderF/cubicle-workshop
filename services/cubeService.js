const Cube = require('../models/Cube');
const isURL = require('validator/lib/isURL');

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

    create: ({ name, description, imageUrl, difficulty, creatorId }) => {
        try {
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

            return new Cube({ name, description, imageUrl, difficulty, creatorId }).save();
        } catch (error) {
            throw error;
        }
    },

    update: (id, data) => {
        try {
            const { name, description, imageUrl } = data;

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

            if (!isURL(imageUrl)) {
                throw new Error('Invalid image URL');
            }

            return Cube.updateOne({ _id: id }, data);
        } catch (error) {
            throw error;
        }
    },

    delete: (id) => {
        return Cube.deleteOne({ _id: id });
    },
}