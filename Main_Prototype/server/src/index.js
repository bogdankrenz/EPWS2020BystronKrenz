import express from "express"
const app = express()

import indexRouter from "./routes/index.js"
import partiesRouter from "./routes/parties.js"

import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL,  {useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection


db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use("/", indexRouter)
app.use("/parties", partiesRouter)

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'))