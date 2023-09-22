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

dancin.addEventListener('click', playDancin)
rob.addEventListener('click', playRob)
moon.addEventListener('click', playMoon)

let currentAudio = null;

function playDancin() {
    if (currentAudio) {
        currentAudio.pause();
    }
    const audioDancin = new Audio('./assets/music/Aaron Smith Ft. Luvli — Dancin (Krono Remix).mp3')
    audioDancin.currentTime = 0;
    audioDancin.volume = document.querySelector('.volumeBar').value / 100; // Установка громкости
    audioDancin.play();
    currentAudio = audioDancin;
}


function playRob() {
    if (currentAudio) {
        currentAudio.pause();
    }
    const audioRob = new Audio('./assets/music/Rob Zombie — Superbeast.mp3')
    audioRob.currentTime = 0;
    audioRob.volume = document.querySelector('.volumeBar').value / 100; // Установка громкости
    audioRob.play();
    currentAudio = audioRob;
}


function playMoon() {
    if (currentAudio) {
        currentAudio.pause();
    }
    const audioMoon = new Audio('./assets/music/TTM BAND — To the Moon.mp3')
    audioMoon.currentTime = 0;
    audioMoon.volume = document.querySelector('.volumeBar').value / 100; // Установка громкости
    audioMoon.play();
    currentAudio = audioMoon;
}

// Добавление обработчика события input для ползунка громкости
document.querySelector('.volumeBar').addEventListener('input', function () {
    if (currentAudio) {
        currentAudio.volume = this.value / 100; // Обновление громкости при изменении ползунка
    }
});