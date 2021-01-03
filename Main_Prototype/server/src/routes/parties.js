import { Router } from "express"
import Party from "../models/parties.js"

const router = Router()

// Get all parties
router.get("/", async (req, res) => {
    try {
        const parties = await Party.find({})
        res.send(parties)
    } catch {

    }
})

// Get specific party
router.get("/:partyId", async (req, res) => {
    try {
        const party = await Party.find({_id : req.params.partyId})
        res.send(party)
    } catch {
        res.status(404).send(`Party with ID ${req.params.partyId} could not be found`)
    }
})

// Add a new guest
router.put("/:partyId/newGuest", async (req, res) => {
    try {
        let party = await Party.find({_id : req.params.partyId})
        party[0].userCount++
        
        party[0].save((err, newParty) => {
            if (err) {
                res.status(500).send("Error occurred")
                console.error(err)
            } else {
                res.send(newParty)
            }
        })

    } catch {
        res.status(404).send(`Party with ID ${req.params.partyId} could not be found`)
    }
})

//Create new party
router.post("/", (req, res) => {
    let partyName = req.query.name

    const party = new Party({
        partyName: partyName,
        admin: 'Bogdan',
    })

    party.save((err, newParty) => {
        if (err) {
            res.status(500).send("Error occurred")
            console.error(err)
        } else {
            res.send(newParty)
        }
    })
})

export default router