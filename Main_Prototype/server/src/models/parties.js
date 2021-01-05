import mongoose from 'mongoose';
const { Schema } = mongoose;

const partiesSchema = new Schema({
    partyName: { type: String, required: true },
    admin: String,
    userCount: { type: Number, default: 0 },
    artists: [{
        _id: String,
        name: String,
        votes: Number,
        songs: { 
            type: [String], 
            default: [],
            ref: "Songs"
        }
    }]
})

export default mongoose.model("Parties", partiesSchema)