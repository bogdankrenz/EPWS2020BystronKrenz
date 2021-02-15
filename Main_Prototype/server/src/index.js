// external imports
import express from "express"
import mongoose from 'mongoose'
import Song from "./models/songs.js"
import Party from "./models/parties.js"
import bodyParser from "body-parser"
import cors from 'cors'
import { createServer } from "http"
import { Server } from "socket.io"

// internal imports
import indexRouter from "./routes/index.js"
import partiesRouter from "./routes/parties.js"
import songsRouter from "./routes/songs.js"
import { error } from "console"

const app = express()
app.use(bodyParser.urlencoded({limit: "3mb", extended: false}))
app.use(cors())

// setting up the db connection
mongoose.connect(process.env.DATABASE_URL,  {useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// definig the main routes
app.use("/", indexRouter)
app.use("/parties", partiesRouter)
app.use("/songs", songsRouter)

// socket.io setup for realTime connection with host dashboard
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
})


io.on("connection", (socket) => {

    socket.on("host", (partyID) => {
        console.log("New host at Party", partyID, "connected")
        socket.join(partyID)
        getRoomAndEmit(io, partyID)
    })

    socket.on("guest", (partyID) => {
        console.log("New guest at Party", partyID, "connected")
        getRoomAndEmit(io, partyID)
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected")
    });
})

const getRoomAndEmit = async (socket, partyID) => {

    try {
        const party = await Party.find({_id : partyID})
        const songs = await Song.find({partyID : partyID, partyFit: {$gt: 70} }).sort( { "votes": -1, "partyFit" : -1 } ).limit(50)
        const guestCount = party.userCount

        // Emitting a new message. Will be consumed by the host only
        socket.to(partyID).emit("dashboardUpdate", songs, guestCount);
    } catch {
        console.error("Error occured")
    }

};


httpServer.listen(process.env.PORT || 3333, () => console.log('Listening on port 3333'))