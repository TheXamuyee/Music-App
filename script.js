const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/01.mp3',
        displayName: 'Rauw Alejandro: Bzrp Music',
        cover: 'assets/01.jpg',
        artist: 'Bizarrap, Rauw Alejandro',
    },
    {
        path: 'assets/1.mp3',
        displayName: 'Neutro Shorty: Bzrp Music',
        cover: 'assets/1.jpg',
        artist: 'Bizarrap, Neutro Shorty',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Big Soto: Bzrp Music',
        cover: 'assets/2.jpg',
        artist: 'Bizarrap, Big Soto',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Zaramay: Bzrp Music',
        cover: 'assets/3.jpg',
        artist: 'Bizarrap, ZARAMAY',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Dani Ribba: Bzrp Music',
        cover: 'assets/4.jpg',
        artist: 'Bizarrap, Dani Ribba',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Big Booty',
        cover: 'assets/5.jpg',
        artist: 'Hozwal, Young Miko, Lil Geniuz',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Lisa',
        cover: 'assets/6.jpg',
        artist: 'Young Miko',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'My Name',
        cover: 'assets/7.jpg',
        artist: 'Neutro Shorty',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'The World is mine',
        cover: 'assets/8.jpg',
        artist: 'Neutro Shorty',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Hennessy',
        cover: 'assets/9.jpg',
        artist: 'Neutro Shorty, Big Soto',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'DUBAI',
        cover: 'assets/10.jpg',
        artist: 'Trueno, Beny Jr',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'Lastima',
        cover: 'assets/11.jpg',
        artist: 'Neutro Shorty, Selected Music',
    },
    {
        path: 'assets/12.mp3',
        displayName: 'Tal Vez',
        cover: 'assets/12.jpg',
        artist: 'Paulo Londra',
    },
    {
        path: 'assets/13.mp3',
        displayName: 'Adan y Eva',
        cover: 'assets/13.jpg',
        artist: 'Paulo Londra',
    },
    {
        path: 'assets/14.mp3',
        displayName: 'Homerun',
        cover: 'assets/14.jpg',
        artist: 'Paulo Londra',
    },
    {
        path: 'assets/15.mp3',
        displayName: 'Rara Vez',
        cover: 'assets/15.jpg',
        artist: 'Taiu, Milo J',
    },
    {
        path: 'assets/16.mp3',
        displayName: 'Milagrosa',
        cover: 'assets/16.jpg',
        artist: 'Milo J',
    },
    {
        path: 'assets/17.mp3',
        displayName: 'Disfruto',
        cover: 'assets/17.jpg',
        artist: 'Carla Morrison',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
