import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(catchSecond, 1000))

function catchSecond ({seconds}) {
    localStorage.setItem(LOCALSTORAGE_KEY, seconds)
};

const time = localStorage.getItem(LOCALSTORAGE_KEY)

player.setCurrentTime(time)


