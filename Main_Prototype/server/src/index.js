if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require("express")
const app = express()
const indexRouter = require("./routes/index")

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,  {useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use("/", indexRouter)


app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));

/* db.init().then(() => {
    app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
}); */
