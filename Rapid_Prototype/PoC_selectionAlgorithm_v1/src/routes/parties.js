import e, { Router } from "express"
import Party from "../models/parties.js"
import Song from "../models/songs.js"
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
    
    const party = new Party({
        partyName: req.body.partyName,
        explicitSongsAccepted: req.body.explicitSongsAccepted,
        justInstrumental: req.body.justInstrumental,
        preferredEnergy: req.body.preferredEnergy,
        admin: 'Admin',
    })

    party.save((err, newParty) => {
        if (err) {
            res.status(500).send(err.message)
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
        // a list of user tracks is send to the guest to show him that the application is working
        const userTracks = await addUserTracksToParty(token, party)

        party.save((err) => { 
            if (err) { 
                console.error(err)
            } else {
                res.send(userTracks)

                // addUserTracksToParty is called again asynchronously to add more of users prefered songs 
                // to the partys song list without making him wait for the result -> timeRange is changed for this call
                addUserTracksToParty(token, party, "long_term")
            } 
        })

    } catch {
        res.status(404).send(`Party with ID ${req.params.partyId} could not be found`)
    }
})

// Get recomended songs for the party
router.get("/:partyId/songs", async (req, res) => {
    try {
        const songs = await Song.find({partyID : req.params.partyId, partyFit: {$gt: 70} }).sort( { "votes": -1, "partyFit" : -1 } ).limit(50)
        res.send(songs)
    } catch {
        console.error("Error occured")
    }
})

export default router