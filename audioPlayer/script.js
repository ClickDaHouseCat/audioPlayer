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
})

low.addEventListener('click', ()=>{
    loud.style.display = 'none'
    low.style.display = 'none'
    mute.style.display ='block'
    volume.value = 0
})

//no Mute
mute.addEventListener('click',()=>{
    loud.style.display = 'none'
    low.style.display = 'block'
    mute.style.display ='none'
    volume.value = 40
})

})
//=============================================================

//Play Audios
const dancin = document.querySelector('.t1')
const rob = document.querySelector('.t2')
const moon = document.querySelector('.t3')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')


dancin.addEventListener('click', playDancin)
rob.addEventListener('click', playRob)
moon.addEventListener('click', playMoon)

let currentAudio = null;
let currentTrackIndex = -1; // Индекс текущего трека

const tracks = [
    './assets/music/Aaron Smith Ft. Luvli — Dancin (Krono Remix).mp3',
    './assets/music/Rob Zombie — Superbeast.mp3',
    './assets/music/TTM BAND — To the Moon.mp3'
];

function playTrack(index) {
    if (currentAudio) {
        currentAudio.pause();
    }
    currentTrackIndex = index;
    const audio = new Audio(tracks[index]);
    audio.currentTime = 0;
    audio.volume = document.querySelector('.volumeBar').value / 100;
    audio.play();
    currentAudio = audio;
}

prev.addEventListener('click',playPrev)
next.addEventListener('click',playNext)

function playDancin() {
    playTrack(0);
}

function playRob() {
    playTrack(1);
}

function playMoon() {
    playTrack(2);
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