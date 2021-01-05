import fetch from 'node-fetch'
import Party from "../models/parties.js"
import Song from "../models/songs.js"

/**
 * @param {string} token The token to get access to a users spotify account
 * @param {Party} party The party a users songs should be added to
 */

export default async function addUserTracksToParty(token, party){

    const url = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10"

    var header = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer BQCNPJfSSlXyEBDhyZjGy_EsSu_I_lrJzpG6XXk6p144NwYXxeCOiTnyqk49F0LlodoxBhuUMnTp59hKtm2CEVUEg6MxKA30Ue0egNiJpdGMUtSX7R0USTCwLv1W2Fgfkd_mPlTsISCeuEa70H2qzg',
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
        let existingArtist = party.artists.id(song.artists[0].id)

        // Wenn Künstler nicht in DB gespeichert -> neuen Künstler anlegen u. Song speichern
        if(!existingArtist){
            const newSong = addSong(song)

            var artist = {
                _id: song.artists[0].id,
                name: song.artists[0].name,
                votes: 1,
                songs: newSong
            }
            party.artists.push(artist)

        } else {
            // Wenn Künstler bereits in DB gespeichert -> Prüfen ob Song ebenfalls vorhanden ist
            let existingSongID = existingArtist.songs.find(songID => songID == song.id)

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
        const newSong = new Song({
            _id: song.id,
            title: song.name,
            explicit: song.explicit,
            duration_s: song.duration_ms / 1000,
            images: {
                height: 100,
                url: "Not done yet",
                width: 100
            },
            votes: 1,
        })
        newSong.save((err) => { if (err) { console.error(err)}  })
        return newSong
    }
}