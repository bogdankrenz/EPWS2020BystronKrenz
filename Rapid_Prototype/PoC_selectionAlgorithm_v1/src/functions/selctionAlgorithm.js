
// Pseudocode for Now !!!!
partySongs.forEach(song => {
    const guestPreference = (song.votes / party.guestCount) * (song.artist.votes / party.guestCount )* 100
    
    if (guestPreference > averageGuestPreference) {
        const partyFit = audioCompare(party.audioProfile, song.audioProfile)
        song.score = guestPreference + partyFit / 2
    }
});

function compare (partyProfile, songProfile) {

    if(songProfile.explicit && !partyProfile.explicit) {
        return 0
    } 

    if(songProfile.danceability < 0.7 * partyProfile.danceability || songProfile.speechiness > 1.5 * partyProfile.speechiness) {
        return 0
    } 

    const partyFit = Math.abs(songProfile.danceability - partyProfile.danceability) + 
                     Math.abs(songProfile.speechiness - partyProfile.speechiness) * 0.9 +
                     Math.abs(songProfile.tempo - partyProfile.tempo) * 0.9 +
                     moreProfiles

    return (1 - partyFit) * 100
}



