import { Router } from "express"
import Song from "../models/parties.js"

const router = Router()

// Get all songs
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find({})
        res.send(songs)
    } catch {

    }
})

export default router