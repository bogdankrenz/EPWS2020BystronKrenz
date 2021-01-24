/**
 * @param {Song} song The song which the partyFit should be calculated for
 * @param {Party} party The party a users songs should be added to
 */

export default function getPartyFit(song, party) {

    // MARK: check for exclusion criteria --------------------------------------------------------------------------------

    // speechiness detects the presence of spoken words in a track. 
    // values above 0.66 describe tracks that are probably made entirely of spoken words => not wanted at any party
    if (song.speechiness > 0.65){
        return -1
    }

    // if a song is explicit but the host doesn't accept explicit songs => not wanted at this party
    if (song.explicit && !party.explicitSongsAccepted) {
        return -1
    }

    // Predicts whether a track contains no vocals
    // values above 0.5 are intended to represent instrumental tracks
    if (song.instrumentalness < 0.5 && party.justInstrumental) {
        return -1
    }

    // MARK: if check passed, assignment of party values -----------------------------------------------------------------

    var prefTempo
    var prefDanceability
    var prefLoudness
    var prefEnergy
    var prefAcousticness

    switch (party.preferredEnergy) {
        case 1:
            console.log("Preference = 1")
            prefTempo           = [0, 100]
            prefDanceability    = [0, 1]
            prefLoudness        = [-60, -5]
            prefEnergy          = [0, 0.4]
            prefAcousticness    = [0.6, 1]
            break;
        case 2:
            prefTempo           = [0, 110]
            prefDanceability    = [0, 1]
            prefLoudness        = [-60, -5]
            prefEnergy          = [0, 0.45]
            prefAcousticness    = [0.5, 1]
            break;
        case 3:
            prefTempo           = [0, 110]
            prefDanceability    = [0, 1]
            prefLoudness        = [-60, -5]
            prefEnergy          = [0, 0.5]
            prefAcousticness    = [0.5, 1]
            break;
        case 4:
            prefTempo           = [60, 120]
            prefDanceability    = [0, 1]
            prefLoudness        = [-60, -4]
            prefEnergy          = [0, 0.55]
            prefAcousticness    = [0.3, 1]
            break;
        case 5:
            prefTempo           = [60, 120]
            prefDanceability    = [0, 1]
            prefLoudness        = [-60, -3]
            prefEnergy          = [0, 0.65]
            prefAcousticness    = [0.2, 1]
            break;
        case 6:
            prefTempo           = [70, 130]
            prefDanceability    = [0.1, 1]
            prefLoudness        = [-40, -3]
            prefEnergy          = [0.1, 0.75]
            prefAcousticness    = [0, 0.9]
            break;
        case 7:
            prefTempo           = [70, 130]
            prefDanceability    = [0.2, 1]
            prefLoudness        = [-20, -3]
            prefEnergy          = [0.2, 0.85]
            prefAcousticness    = [0, 0.8]
            break;
        case 8:
            prefTempo           = [80, 150]
            prefDanceability    = [0.3, 1]
            prefLoudness        = [-18, -2]
            prefEnergy          = [0.3, 0.95]
            prefAcousticness    = [0, 0.7]
            break;
        case 9:
            prefTempo           = [100, 200]
            prefDanceability    = [0.4, 1]
            prefLoudness        = [-17, 0]
            prefEnergy          = [0.4, 1]
            prefAcousticness    = [0, 0.5]
            break;
        case 10:
            prefTempo           = [120, 400]
            prefDanceability    = [0.6, 1]
            prefLoudness        = [-16, 0]
            prefEnergy          = [0.5, 1]
            prefAcousticness    = [0, 0.3]
            break;
    }

    // MARK: values are used to detect partyFit score --------------------------------------------------------------------

    // logs can be used to constantly enhance the algorithm
    // console.log(song.title + " - Tempo: " + outlierScore(song.tempo, prefTempo) * 0.01)
    // console.log(song.title + " - Dance: " + outlierScore(song.danceability, prefDanceability))
    // console.log(song.title + " - Energy: " + outlierScore(song.energy, prefEnergy))
    // console.log(song.title + " - Loud: " + outlierScore(song.loudness, prefLoudness) * 0.01)
    // console.log(song.title + " - Acoustic: " + outlierScore(song.acousticness, prefAcousticness))

    // outlierScore get called for each partyValue to check if the songs value fit in the expeckted range
    // all outlier scores are added and get deducted from one afterwards if the value doesn`t exeed one
    // if yes the party fit is 0, otherwise it`s a percentage => highest for the best fit
    const partyFit = outlierScore(song.tempo, prefTempo) * 0.01 + outlierScore(song.danceability, prefDanceability) 
                    + outlierScore(song.energy, prefEnergy) + outlierScore(song.loudness, prefLoudness) * 0.01
                    + outlierScore(song.acousticness, prefAcousticness)

    return partyFit <= 1 ? (1 - partyFit) * 100 : 0
}

// outlierScore checks if a value is inside a specified range
// if yes 0 is returned, if not it returns how far the value is outside the range

/**
 * @param {Float} songProfileValue the value of a song profile stat
 * @param {Array<Float>} preferredRange range the value should lay in
 */

function outlierScore(songProfileValue, preferredRange){
    if (preferredRange[0] <= songProfileValue && songProfileValue <= preferredRange[1]){
        return 0
    } else if (preferredRange[0] > songProfileValue) {
        return preferredRange[0] - songProfileValue
    } else {
        return songProfileValue - preferredRange[1]
    }
}
