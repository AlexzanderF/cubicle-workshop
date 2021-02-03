const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            // custom URL validation using npm library (validator)
            validator: (url) => validator.isURL(url,
                {
                    protocols: ['http', 'https'],
                    require_protocol: true,
                    require_valid_protocol: true
                }),
            message: 'Invalid image URL!'
        }
    },
    difficulty: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;