import mongoose from 'mongoose';
const { Schema } = mongoose;

const partiesSchema = new Schema({
    partyName: { type: String, required: true },
    explicitSongsAccepted: { type: Boolean, default: true },
    justInstrumental: { type: Boolean, default: false },
    preferredEnergy: { type: Number, default: 6 },
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
    }],
    has_Outliers: Boolean
})

export default mongoose.model("Parties", partiesSchema)