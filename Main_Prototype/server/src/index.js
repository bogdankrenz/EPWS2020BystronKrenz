const express = require("express")
const app = express()

const db = require('./persistence')
const indexRouter = require("./routes/index")

app.use("/", indexRouter)


app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));

/* db.init().then(() => {
    app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
}); */
