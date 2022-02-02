const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    imageUrl: {type: String },
    currentPrice: {type: Number}
})

module.exports = model('Item', schema)