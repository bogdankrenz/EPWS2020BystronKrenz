import { Router } from "express"
import Party from "../models/parties.js"

const router = Router()

// Get all parties
router.get("/", async (req, res) => {
    try {
        const parties = Party.find({})
        res.send(`Here are all parties: /${parties}`)
    } catch {

    }

    
})

//Create new party
router.post("/", (req, res) => {
    const party = new Party({
        admin: Carlos,
        userCount: 1,
        songs: []
    })

    party.save((err, newParty) => {
        if (err) {
            res.send("Error occurred")
            console.error(err)
        } else {
            //res.redirect(`parties/${newParty.id}`)
            res.redirect("parties")
        }
    })
})

export default router