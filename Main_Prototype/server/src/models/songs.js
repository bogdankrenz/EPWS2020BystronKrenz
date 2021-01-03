import mongoose from 'mongoose';
const { Schema } = mongoose;

const songsSchema = new Schema({
    spotifyID: String,
    title: String,
    voteCount: Number,
})

export default mongoose.model("Songs", songsSchema)