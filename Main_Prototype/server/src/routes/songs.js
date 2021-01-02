import { Router } from "express"
import Song from "../models/parties.js"

const router = Router()

// Get all songs
router.get("/", async (req, res) => {
    try {
        const songs = Song.find({})
        res.send(`Here are all songs: /${songs}`)
    } catch {

    }
})

//Create new song
router.post("/", (req, res) => {
    const song = new Song({
      
    })

    song.save((err, newSong) => {
        if (err) {
            res.send("Error occurred")
            console.error(err)
        } else {
            //res.redirect(`parties/${newParty.id}`)
            res.redirect("songs")
        }
    })
})

export default router