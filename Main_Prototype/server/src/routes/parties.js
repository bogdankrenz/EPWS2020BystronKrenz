import { Router } from "express"
const router = Router()

// Get all parties
router.get("/", (req, res) => {
    res.send("Here are all parties")
})

//Create new party
router.post("/", (req, res) => {
    res.send("Created a new party")
})

export default router