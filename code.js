const audio = document.getElementById("audioPlayer");
const buttons = document.querySelectorAll(".playBtn");

//songs
const playlists = {
  emotional: ["songs/pain.mp3", "songs/naruto.mp3", "songs/pain.mp3"],
  hard: ["songs/demon.mp3", "songs/mello.mp3", "songs/suspence.mp3"],
};

//choosing Random Playlist
function randomPlaylist() {
  let num = Math.floor(Math.random() * Object.keys(playlists).length);
  return num;
}

//Choosing Random Song
function randomSong(obj) {
  let num = Math.floor(Math.random() * playlists[obj].length);
  return num;
}

//Playlist Buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let song = btn.parentElement.getAttribute("data-folder");
    let randomPlay = randomSong(song);
    let songSrc = playlists[song][randomPlay];
    audio.src = songSrc;

    audio.play();
    next(randomPlay, song);
    pre(randomPlay, song);
  });
});

//Playing Random Song
function playSong(){
        let Plist = randomPlaylist();
        let song = Object.keys(playlists)[Plist];
        console.log("Playlist : ", song);
        let randomPlay = randomSong(song);
        let songSrc = playlists[song][randomPlay];
        console.log(songSrc);
        audio.src = songSrc;

        audio.play();
        next(randomPlay, song);
        pre(randomPlay, song);
}

//Making Of Pre, Play/Pause , Next btn
let playBtn = document.querySelector(".pause");
let preBtn = document.querySelector(".pre");
let nextBtn = document.querySelector(".next");

//Previous Button
function pre(randomPlay, song) {
  preBtn.addEventListener("click", () => {
    if (randomPlay == 0) {
      randomPlay = playlists[song].length - 1;
    } else {
      randomPlay--;
    }
    let preSong = playlists[song][randomPlay];
    console.log(preSong);
    audio.src = preSong;
    audio.play();
  });
}

//Next Button
function next(randomPlay, song) {
  nextBtn.addEventListener("click", () => {
    if (randomPlay == playlists[song].length - 1) {
      randomPlay = 0;
    } else {
      randomPlay++;
    }
    let nextSong = playlists[song][randomPlay];
    console.log(nextSong);
    audio.src = nextSong;
    audio.play();
  });
}

//Main Play/Pause Button
let check = false;
playBtn.addEventListener("click", () => {
    if (audio.paused && check == false) {
        playSong();
        check = true;
    }else if(audio.paused && check == true){
        audio.play();
    }else if(!audio.paused && check == false){
        check = true;
        audio.pause();
    }else{
        audio.pause();
    }
});



//left side

// <--Ai code-->

function toggleDropdown() {
    const dropdown = document.getElementById("playlistDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }

  function selectPlaylist(name) {
    alert("Selected playlist: " + name);
    // You can load playlist logic here
    document.getElementById("playlistDropdown").style.display = "none"; // close dropdown
  }

  // Optional: close dropdown if clicked outside
  window.onclick = function(e) {
    if (!e.target.matches('.dropdown button')) {
      document.getElementById("playlistDropdown").style.display = "none";
    }
  }