import { Router } from "express"
import Song from "../models/songs.js"

const router = Router()

// Get all songs
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find({})
        res.send(songs)
    } catch {

    }
})

// Get all songs from a specific party 
router.get("/:partyId", async (req, res) => {
    try {
        const songs = await Song.find({partyID : req.params.partyId})
        res.send(songs)
    } catch {

    }
})

export default router