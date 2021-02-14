const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { Schema } = mongoose;

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            // custom URL validation using npm library (validator)
            validator: (url) => isURL(url,
                {
                    protocols: ['http', 'https'],
                    require_protocol: true,
                    require_valid_protocol: true
                }),
            message: '  '
        }
    },
    difficulty: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

cubeSchema.post('save', function (err, doc, next) {
    if (err.errors['imageUrl']) {
        next(new Error(err.errors['imageUrl'].message));
    } else {
        next(err);
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;