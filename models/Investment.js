const {Schema, model, Types} = require('mongoose')

/*const schema = new Schema({
    data: {type: Object, required: true, unique: true },
    owner: {type: Types.ObjectId, required: true, unique: true},
    item: {type: Types.ObjectId, required: true, unique: true},
    purchaseDate: {type: Date, required: true, unique: true},
    averageBuyPrice: {type: Number, required: true},
    amount: {type: Number, required: true}
})*/

const schema = new Schema({
    owner: {type: Types.ObjectId, required: true },
    item: {type: Types.ObjectId, required: true, ref:'Item'},
    purchaseDate: {type: Date, required: true},
    averageBuyPrice: {type: Number, required: true},
    amount: {type: Number, required: true}
})

schema.index({owner: 1, item: 1, purchaseDate: 1}, {unique: true});

module.exports = model('Investment', schema)