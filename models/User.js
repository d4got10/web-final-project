const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    investments: [{type: Types.ObjectId, ref: 'Investment'}]
})

module.exports = model('User', schema)