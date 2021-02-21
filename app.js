const searchValue = document.getElementById('search-box');
document.getElementById('search-btn').addEventListener('click', () => {
    fetch(`https://api.lyrics.ovh/suggest/${searchValue.value}`)
    .then(response => response.json())
    .then(data => getSongs(data.data))
})
const getSongs = (songs) => {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';
    songs.map(song => {
        // console.log(song);
        const eachSong = `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio src="${song.preview}" controls></audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.title}', '${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
        `
        songsContainer.innerHTML += eachSong;
    })
}

const getLyrics = (songTitle, songArtistName) => {
    fetch(`https://api.lyrics.ovh/v1/${songArtistName}/${songTitle}`)
    .then(response => response.json())
    .then(data => showLyrics(data.lyrics))
}
const showLyrics = (lyrics) => {
    const lyricsContainer = document.getElementById('lyrics-container');
    const lyricsText = `
    <pre class="text-white">${lyrics}</pre>
    `
    lyricsContainer.innerHTML = lyricsText;
}