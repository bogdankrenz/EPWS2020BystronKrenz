import { Router } from "express"
import Party from "../models/parties.js"
import addUserTracksToParty from "../functions/spotifyAccess.js"

const router = Router()

// ROUTES RELATED TO ALL PARTIES

// Get all parties
router.get("/", async (req, res) => {
    try {
        const parties = await Party.find({})
        res.send(parties)
    } catch {

    }
})

//Create new party
router.post("/", (req, res) => {
    let partyName = req.query.partyName

    const party = new Party({
        partyName: partyName,
        admin: 'Carlos',
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



// ROUTES RELATED TO ONE SPECIFIC PARTY

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
        let token = req.query.token
        let party = await Party.findById(req.params.partyId)
        party.userCount++

        // addUserTracksToParty is called to add the users prefered songs to the partys song list
        await addUserTracksToParty(token, party)

        party.save((err, newParty) => {
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

export default router