import fetch from 'node-fetch'
import Party from "../models/parties.js"
import Song from "../models/songs.js"

/**
 * @param {string} token The token to get access to a users spotify account
 * @param {Party} party The party a users songs should be added to
 */

export default async function addUserTracksToParty(token, party){

    // long_term (calculated from several years of data and including all new data as it becomes available)
    // medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default: medium_term
    const timeRange = "short_term"

    // The number of entities to return. Default: 20. Minimum: 1. Maximum: 50
    const limit = "10"

    const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`

    var header = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }

    const response = await fetch(url, header)
    const json = await response.json()

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        console.error(message)
        console.error(json)
        throw new Error(message)
    }

    await json.items.forEach(async (song) => {

        // Prüfen ob der Künstler bereits in DB gespeichert ist
        const artistID = `${party._id}-${song.artists[0].id}`
        const existingArtist = party.artists.id(artistID)

        // Wenn Künstler nicht in DB gespeichert -> neuen Künstler anlegen u. Song speichern
        if(!existingArtist){
            const newSong = addSong(song)

            var artist = {
                _id: artistID,
                name: song.artists[0].name,
                votes: 1,
                songs: newSong
            }
            party.artists.push(artist)

        } else {
            // Wenn Künstler bereits in DB gespeichert -> Prüfen ob Song ebenfalls vorhanden ist
            const songID = `${party._id}-${song.id}`
            const existingSongID = existingArtist.songs.find(existingSongID => existingSongID == songID)

            // Wenn Künstler in DB gespeichert u. Song noch nicht -> Neuen Song hinzufügen und speichern
            if(!existingSongID){
                const newSong = addSong(song)
                existingArtist.songs.push(newSong)
            } else {
                // Wenn Künstler u. Song in DB gespeichert -> Song vote um eins erhöhen
                const existingSong = await Song.findById(existingSongID)
                existingSong.votes++
                existingSong.save((err) => {if (err) {console.error(err)}})
            }
        }
    });

    function addSong(song) {
        const songID = `${party._id}-${song.id}`
        const newSong = new Song({
            _id: songID,
            partyID: party._id,
            title: song.name,
            artist: song.artists[0].name,
            explicit: song.explicit,
            duration_s: song.duration_ms / 1000,
            images: song.album.images,
            votes: 1,
        })
        newSong.save((err) => { if (err) { console.error(err)}  })
        return newSong
    }
}