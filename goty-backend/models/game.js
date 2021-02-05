const { Schema, model } = require('mongoose');

const GameSchema = Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true
    }
});

GameSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Game', GameSchema );
