const mongoose = require('mongoose');
const { isURL } = require('validator');
const { Schema } = mongoose;

const accessorySchema = new Schema({
    name: { type: String, required: true },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (url) => isURL(url,
                {
                    protocols: ['http', 'https'],
                    require_protocol: true,
                    require_valid_protocol: true
                }),
            message: 'Invalid image URL'
        }
    },
    description: { type: String, required: true, maxlength: 100 },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube' }]
});

accessorySchema.post('save', function (err, doc, next) {
    if (err.errors['imageUrl']) {
        next(new Error(err.errors['imageUrl'].message));
    } else {
        next(err);
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;