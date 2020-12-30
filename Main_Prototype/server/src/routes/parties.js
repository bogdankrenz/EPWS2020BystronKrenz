const express = require("express")
const router = express.Router()

// Get all parties
router.get("/", (req, res) => {
    res.send("Here are all parties")
})

//Create new party
router.post("/", (req, res) => {
    res.send("Created a new party")
})

module.exports = router