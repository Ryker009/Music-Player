document.addEventListener("DOMContentLoaded", () => {
    // Audio and player elements
    const audio = document.getElementById("audioPlayer");
    const playPauseBtn = document.querySelector(".pause");
    const nextBtn = document.querySelector(".next");
    const preBtn = document.querySelector(".pre");
    const songTitle = document.querySelector(".song-title");
    const songListContainer = document.querySelector(".songList");
    const playlistButtons = document.querySelectorAll(".playBtn");

    // Seek bar elements
    const seekBar = document.querySelector(".seek-bar");
    const progress = document.querySelector(".progress");
    const currentTimeEl = document.querySelector(".current-time");
    const totalDurationEl = document.querySelector(".total-duration");
    const volumeSlider = document.querySelector(".volume-slider");


    const playlists = {
        emotional: ["songs/pain.mp3", "songs/naruto.mp3"],
        hard: ["songs/demon.mp3", "songs/mello.mp3", "songs/suspence.mp3"],
    };

    let currentPlaylist = [];
    let currentSongIndex = 0;
    let isPlaying = false;

    // Function to format time from seconds to M:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Function to populate the library
    function populateLibrary() {
        songListContainer.innerHTML = "";
        Object.keys(playlists).forEach(playlistName => {
            const playlist = playlists[playlistName];
            playlist.forEach(songSrc => {
                const songName = songSrc.split('/').pop().replace('.mp3', '');
                const li = document.createElement("li");
                li.textContent = songName;
                li.dataset.src = songSrc;
                li.addEventListener("click", () => {
                    playSong(songSrc);
                });
                songListContainer.appendChild(li);
            });
        });
    }

    // Function to play a song
    function playSong(songSrc) {
        audio.src = songSrc;
        audio.play();
        isPlaying = true;
        updatePlayPauseIcon();
        updateNowPlaying(songSrc);
        highlightCurrentSong(songSrc);

        // Find the current song's playlist and index
        for (const playlistName in playlists) {
            const index = playlists[playlistName].indexOf(songSrc);
            if (index !== -1) {
                currentPlaylist = playlists[playlistName];
                currentSongIndex = index;
                break;
            }
        }
    }

    // Update the play/pause button icon
    function updatePlayPauseIcon() {
        if (isPlaying) {
            playPauseBtn.innerHTML = '<img src="img/play-circle-stroke-rounded.svg" alt="pause">';
        } else {
            playPauseBtn.innerHTML = '<img src="img/play-circle-stroke-rounded.svg" alt="play">';
        }
    }

    // Update the "Now Playing" text
    function updateNowPlaying(songSrc) {
        const songName = songSrc.split('/').pop().replace('.mp3', '');
        songTitle.textContent = songName;
    }

    // Highlight the currently playing song in the library
    function highlightCurrentSong(songSrc) {
        const allSongs = songListContainer.querySelectorAll("li");
        allSongs.forEach(song => {
            if (song.dataset.src === songSrc) {
                song.classList.add("playing");
            } else {
                song.classList.remove("playing");
            }
        });
    }

    // Main Play/Pause Button
    playPauseBtn.addEventListener("click", () => {
        if (audio.src) {
             if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            isPlaying = !isPlaying;
            updatePlayPauseIcon();
        }
    });
    
    // Update icon and state when audio pauses or plays
    audio.addEventListener('play', () => { isPlaying = true; updatePlayPauseIcon(); });
    audio.addEventListener('pause', () => { isPlaying = false; updatePlayPauseIcon(); });


    // Next Button
    nextBtn.addEventListener("click", () => {
        if (currentPlaylist.length > 0) {
            currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
            playSong(currentPlaylist[currentSongIndex]);
        }
    });

    // Previous Button
    preBtn.addEventListener("click", () => {
        if (currentPlaylist.length > 0) {
            currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
            playSong(currentPlaylist[currentSongIndex]);
        }
    });

    // Playlist Buttons on Cards
    playlistButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const folder = btn.parentElement.getAttribute("data-folder");
            const playlist = playlists[folder];
            if (playlist && playlist.length > 0) {
                const randomIndex = Math.floor(Math.random() * playlist.length);
                playSong(playlist[randomIndex]);
            }
        });
    });

    // --- NEW: Custom Player Logic ---

    // Update seek bar and time display as song plays
    audio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audio;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
        }
    });

    // Update total duration when song metadata loads
    audio.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(audio.duration);
    });

    // Allow seeking by clicking on the seek bar
    seekBar.addEventListener('click', (e) => {
        const width = seekBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if(duration){
            audio.currentTime = (clickX / width) * duration;
        }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });


    // Initial setup
    populateLibrary();
});