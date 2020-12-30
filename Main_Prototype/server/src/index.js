if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require("express")
const app = express()

const indexRouter = require("./routes/index")
const partiesRouter = require("./routes/parties")

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,  {useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use("/", indexRouter)
app.use("/parties", partiesRouter)

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'))