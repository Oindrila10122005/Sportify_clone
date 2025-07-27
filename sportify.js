
let songIndex = 0;
let audioElement = new Audio('movie1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongNmae = document.getElementById('masterSongName');

let songs = [
    {songName: "Sun Raha Hai Na Tu (Female Version)", coverPath: "movie1.jpg", filePath: "movie1.mp3"},
    {songName: "Janam Janam", coverPath: "movie2.jpg", filePath: "movie2.mp3"},
    {songName: "Hasi Ban Gye (Male Version)", coverPath: "movie3.jpg", filePath: "movie3.mp3"},
    {songName: "Lag Ja Gale", coverPath: "movie4.jpg", filePath: "movie4.mp3"},
    {songName: "Uska Hi Bana - Arijit Singh", coverPath: "movie5.jpg", filePath: "movie5.mp3"},
    {songName: "Khud ko Tere", coverPath: "movie6.jpg", filePath: "movie6.mp3"},
    {songName: "Mone Pore Ruby Roy", coverPath: "movie7.jpg", filePath: "movie7.mp3"},
    {songName: "Rimjhim Gire Sawan", coverPath: "movie8.jpg", filePath: "movie8.mp3"},
    {songName: "Bhohut Pyaar Karte Hain (Duet)", coverPath: "movie9.jpg", filePath: "movie9.mp3"},
];

// // Populate song list
// songItems.forEach((element, i) => {
//     if (songs[i]) {
//         const img = element.getElementsByTagName("img")[0];
//         const nameElem = element.getElementsByClassName("songName")[0];
//         if (img) img.src = songs[i].coverPath;
//         if (nameElem) nameElem.innerText = songs[i].songName;
//     }
// });

// Play/Pause master control
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongNmae.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
        // Update the small play icon
        let playIcon = document.getElementsByClassName('songItemPlay')[songIndex];
        if (playIcon) {
            playIcon.classList.remove('fa-play-circle');
            playIcon.classList.add('fa-pause-circle');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        // ❗ Pause the small icon too
        let playIcon = document.getElementsByClassName('songItemPlay')[songIndex];
        if (playIcon) {
            playIcon.classList.remove('fa-pause-circle');
            playIcon.classList.add('fa-play-circle');
    }   }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', () => {
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            masterSongNmae.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});

document.getElementById('after').addEventListener('click', () => {
    if(songIndex>=9) {
        songIndex=0;
    }
    else {
        songIndex +=1;
    }
    audioElement.src = `movie${songIndex+1}.mp3`;
    masterSongNmae.innerText = songs[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.play();
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0) {
        songIndex=0;
    }
    else {
        songIndex -=1;
    }
    audioElement.src = `movie${songIndex+1}.mp3`;
    masterSongNmae.innerText = songs[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.play();
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
