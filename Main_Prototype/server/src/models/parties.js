import mongoose from 'mongoose';
const { Schema } = mongoose;

const partiesSchema = new Schema({
    admin: String,
    userCount: Number,
    songs: [String]
})

export default mongoose.model("parties", partiesSchema)