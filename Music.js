let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');
let songImg = document.getElementById('songImg');
let songList = document.getElementById('songList');

let currentSongIndex = 0;
let currentListItem = null;

const playlist = [
    {
        title: 'Asma ul Husna',
        artist: 'Atif Aslam | Coke Studio Special',
        source: '/Audio/Asma-ul-Husna.mp3',
        image: '/Images/Cover1.jpg'
    },
    {
        title: 'The Beauty of Existence',
        artist: 'Muhammad Al Muqit',
        source: '/Audio/The Beauty of Existence.m4a',
        image: '/Images/Cover2.jpg'
    },
    {
        title: 'My Hope',
        artist: 'Muhammad al Muqit',
        source: '/Audio/My hope.m4a',
        image: '/Images/Cover3.jpg'
    },
    {
        title: "Hasn't Death Called You?",
        artist: 'Nasheed by Mashary Rashed Al Afasy',
        source: "/Audio/Hasn't Death Called You.m4a",
        image: '/Images/Cover4.jpg'
    },
];
loadSong();

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    song.play();
    ctrlIcon.classList.add('fa-pause'); 
    ctrlIcon.classList.remove('fa-play');
    highlightCurrentSong(); 
}

function loadSong() {
    let currentSong = playlist[currentSongIndex];
    song.src = currentSong.source;
    songImg.src = currentSong.image;
    document.querySelector('h1').textContent = currentSong.title;
    document.querySelector('p').textContent = currentSong.artist;
}

function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    } else {
        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }
}

setInterval(() => {
    progress.value = song.currentTime;
}, 500);

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong();
    highlightCurrentSong();
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong();
    highlightCurrentSong();
}

function highlightCurrentSong() {
    if (currentListItem) {
        currentListItem.classList.remove('highlight');
    }
    currentListItem = songList.children[currentSongIndex];
    currentListItem.classList.add('highlight');
}

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');

    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('show-menu');
    });

    playlist.forEach((song, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = song.title;
        listItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong();
            song.play();
            ctrlIcon.classList.add('fa-pause');
            ctrlIcon.classList.remove('fa-play');
            highlightCurrentSong();
        });
        songList.appendChild(listItem);
    });

    highlightCurrentSong();
});