import fetch from 'node-fetch'
import Party from "../models/parties.js"
import Song from "../models/songs.js"
import getPartyFit from "../functions/getPartyFit.js"

/**
 * @param {String} token The token to get access to a users spotify account
 * @param {Party} party The party a users songs should be added to
 * @param {String} timeRange  timespan used to get user favorites from - default: long_term
 */

export default async function addUserTracksToParty(token, party, timeRange = "medium_term"){

    // long_term (calculated from several years of data and including all new data as it becomes available)
    // medium_term (approximately last 6 months), short_term (approximately last 4 weeks)

    // The number of entities to return. Default: 20. Minimum: 1. Maximum: 50
    const limit = "50"

    const userTracksUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`

    var header = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }

    var userSongs = []
    var newSongs = []

    const userTracksResponse = await fetch(userTracksUrl, header)
    const userTracksJson = await userTracksResponse.json()

    if (!userTracksResponse.ok) {
        const message = `An error has occured: ${userTracksResponse.status}`
        console.error(message)
        console.error(userTracksJson)
        throw new Error(message)
    }

    await userTracksJson.items.forEach(async (song) => {

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
                userSongs.push(existingSong)
            }
        }
    })

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

        newSongs.push(newSong)
        userSongs.push(newSong)

        return newSong
    }

    async function addAudioFeatures(newSongs){

        var spotifyIDs = ''

        newSongs.forEach((song, index, array) => {
            if (index != array.length && index != 0){ 
                 spotifyIDs += '%2C'
            }
            spotifyIDs += song._id.split('-').pop()
        })

        const featureUrl = `https://api.spotify.com/v1/audio-features?ids=${spotifyIDs}`
        
        const featureResponse = await fetch(featureUrl, header)
        const featureJson = await featureResponse.json()

        if (!featureResponse.ok) {
            const message = `An error has occured: ${userTracksResponse.status}`
            console.error(message)
            console.error(featureJson)
            throw new Error(message)
        }

        await featureJson.audio_features.forEach(async (audio_feature, index, array) => {

            newSongs[index].danceability        = audio_feature.danceability
            newSongs[index].energy              = audio_feature.energy
            newSongs[index].loudness            = audio_feature.loudness
            newSongs[index].speechiness         = audio_feature.speechiness
            newSongs[index].acousticness        = audio_feature.acousticness
            newSongs[index].instrumentalness    = audio_feature.instrumentalness
            newSongs[index].tempo               = audio_feature.tempo

            newSongs[index].partyFit = getPartyFit(newSongs[index], party)

            newSongs[index].save((err) => { if (err) { console.error(err)} })
        })
    }

    if (newSongs.length > 0) {
        addAudioFeatures(newSongs)
    }

    if (timeRange == "medium_term") {
        return userSongs
    } else {
        party.save((err) => { if (err) { console.error(err)} })
        return
    }
 
}