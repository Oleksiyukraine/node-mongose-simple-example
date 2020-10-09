const mongoose = require('mongoose')
const Schema = mongoose.Schema

let schemaOptions = {
    version: false,
    timestamps: true,
}

let UserSchema = new Schema({
    name: {
        type: String,
        unique: false
    },
}, schemaOptions)

let User = mongoose.model('user', UserSchema)
module.exports = User
