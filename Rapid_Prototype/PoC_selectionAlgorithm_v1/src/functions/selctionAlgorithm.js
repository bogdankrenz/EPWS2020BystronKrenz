
// Pseudocode for Now !!!!
partySongs.forEach(song => {
    const guestPreference = (song.votes / party.guestCount) * (song.artist.votes / party.guestCount )* 100
    
    if (guestPreference > averageGuestPreference) {
        const partyFit = audioCompare(party.audioProfile, song.audioProfile)
        song.score = guestPreference + partyFit / 2
    }
});


