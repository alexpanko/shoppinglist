const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemName: { type: String, required: true },
  itemNotes: { type: String },
  itemUrl: { type: String },
  itemPrice: { type: Number },
  listId: { type: String }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item