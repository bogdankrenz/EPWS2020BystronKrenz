import mongoose from 'mongoose';
const { Schema } = mongoose;

const songsSchema = new Schema({
    _id: String,
    title: String,
    explicit: Boolean,
    duration_s: Number,
    images: {
        height: Number,
        url: String,
        width: Number
    },
    votes: Number,
})

export default mongoose.model("Songs", songsSchema)