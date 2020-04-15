const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema({
  listName: { type: String, required: true },
  listDescription: { type: String },
  listImage: { type: String },
  owner: Schema.Types.ObjectId
})

const List = mongoose.model('List', listSchema)

module.exports = List