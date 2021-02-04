// external imports
import express from "express"
import mongoose from 'mongoose'
import bodyParser from "body-parser"
import cors from 'cors'

// internal imports
import indexRouter from "./routes/index.js"
import partiesRouter from "./routes/parties.js"
import songsRouter from "./routes/songs.js"

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

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'))