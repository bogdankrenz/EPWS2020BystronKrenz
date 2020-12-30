import { Schema, Model } from "mongoose"

const partiesSchema = new Schema({
    admin: String,
    userCount: Number,
    songs: [String]
})

module.exports = Model("parties", partiesSchema)