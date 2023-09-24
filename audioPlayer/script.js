const loud = document.querySelector('.loud')
const mute = document.querySelector('.mute')
const low = document.querySelector('.low')
const volume = document.querySelector('.volumeBar')

//Следим за ползунком громкости и меняем иконку
volume.addEventListener('input', function() {
    // Получаем текущее значение ползунка
    const currentValue = this.value;

if (currentValue> 0 && currentValue < 51){
    mute.style.display = 'none'
    loud.style.display ='none'
    low.style.display = 'block'
} else if (currentValue > 51 && currentValue< 101){
    mute.style.display = 'none'
    loud.style.display ='block'
    low.style.display = 'none'
} else if (currentValue === '0'){
    mute.style.display = 'block'
    loud.style.display ='none'
    low.style.display = 'none'
}

//Mute
loud.addEventListener('click', ()=>{
    loud.style.display = 'none'
    low.style.display = 'none'
    mute.style.display ='block'
    volume.value = 0
    if (currentAudio) {
        currentAudio.volume = volume.value / 100;
    }
})

low.addEventListener('click', ()=>{
    loud.style.display = 'none'
    low.style.display = 'none'
    mute.style.display ='block'
    volume.value = 0
    if (currentAudio) {
        currentAudio.volume = volume.value / 100;
    }
})

//no Mute
mute.addEventListener('click',()=>{
    loud.style.display = 'none'
    low.style.display = 'block'
    mute.style.display ='none'
    volume.value = 40
    if (currentAudio) {
        currentAudio.volume = volume.value / 100;
    }
})

})
//=============================================================

//Play Audios
const dancin = document.querySelector('.t1')
const rob = document.querySelector('.t2')
const moon = document.querySelector('.t3')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const play = document.querySelector('.play')
const pause = document.querySelector('.pause')

let isPlay = false

play.addEventListener('click', () =>{
    play.style.display = 'none'
    pause.style.display = 'block'
})

pause.addEventListener('click', () =>{
    pause.style.display = 'none'
    play.style.display = 'block'
})

pause.addEventListener('click', pauseAudio)

function pauseAudio() {
    if (currentAudio) {
        currentAudio.pause();
    }
}

dancin.addEventListener('click', playDancin)
rob.addEventListener('click', playRob)
moon.addEventListener('click', playMoon)

let currentAudio = null;
let currentTrackIndex = -1; // Индекс текущего трека
let isSeeking = false;// отслеживание прокрутки



let tracks = [
    {
        src: './assets/music/Aaron Smith Ft. Luvli — Dancin (Krono Remix).mp3',
        name: 'Aaron Smith Ft. Luvli — Dancin (Krono Remix)'
    },
    {
        src: './assets/music/Rob Zombie — Superbeast.mp3',
        name: 'Rob Zombie — Superbeast'
    },
    {
        src: './assets/music/TTM BAND — To the Moon.mp3',
        name: 'TTM BAND — To the Moon'
    }
];

play.addEventListener('click', togglePlayPause)

function togglePlayPause() {
    if (currentAudio) {
        if (currentAudio.paused) {
            // Если текущий трек на паузе, то воспроизвести его.
            currentAudio.play();
        } else {
            // В противном случае поставить текущий трек на паузу.
            currentAudio.pause();
        }
    }
}

function playTrack(index) {
    if (currentAudio) {
        currentAudio.pause();
    }
    currentTrackIndex = index;
    const audio = new Audio(tracks[index].src);
    audio.currentTime = 0;
    audio.volume = document.querySelector('.volumeBar').value / 100;

    const trackBar = document.querySelector('.trackBar');
    trackBar.value = 0;
    trackBar.max = audio.duration;

    audio.addEventListener('timeupdate', function () {
        if (!isSeeking) {
            trackBar.value = audio.currentTime;
            updateTrackTime(audio.currentTime, audio.duration);
        }
    });


    audio.addEventListener('timeupdate', function () {
        if (!isSeeking) {
            const trackBar = document.querySelector('.trackBar');
            trackBar.value = audio.currentTime;
            trackBar.max = audio.duration;
        }
    });

    audio.addEventListener('ended', playNext);

    audio.play();
    currentAudio = audio;


    // Обновляем название трека
    const trackNameElement = document.querySelector('.track-name');
    trackNameElement.textContent = `Текущий трек: ${tracks[index].name}`
}

prev.addEventListener('click',playPrev)
next.addEventListener('click',playNext)

let body = document.querySelector('body')

function playDancin() {
    playTrack(0);
    body.style.backgroundImage = 'url("./assets/cover/dancin.jpg")'
}

function playRob() {
    playTrack(1);
    body.style.backgroundImage = 'url("./assets/cover/rob zombie.jpeg")'
}

function playMoon() {
    playTrack(2);
    body.style.backgroundImage = 'url("./assets/cover/tothemoon.jpg")'
}

function playPrev() {
    const prevTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevTrackIndex);
}

function playNext() {
    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextTrackIndex);
}

document.querySelector('.volumeBar').addEventListener('input', function () {
    if (currentAudio) {
        currentAudio.volume = this.value / 100;
    }
});

const trackBar = document.querySelector('.trackBar');
trackBar.addEventListener('input', function () {
    if (currentAudio) {
        currentAudio.currentTime = this.value;
    }
});

trackBar.addEventListener('mousedown', function () {
    isSeeking = true;
});

trackBar.addEventListener('mouseup', function () {
    isSeeking = false;
});


function updateTrackTime(currentTime, totalTime) {
    const currentTimeElement = document.querySelector('.current-time');
    const totalTimeElement = document.querySelector('.total-time');

    currentTimeElement.textContent = formatTime(currentTime);
    totalTimeElement.textContent = formatTime(totalTime);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

