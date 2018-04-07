import './src/styles.scss';
import {emitter} from "./src/modules/emitter/index";
import {data} from "./db/streets";
import {suggest, Autocomplete} from "./src/modules/suggest/index";

const asyncBtn = document.getElementById('async-button');
const usualBtn = document.getElementById('usual-button');
const offAsyncBtn = document.getElementById('off-async-button');
const offUsualBtn = document.getElementById('off-usual-button');


// В условиях времени написать простейшую очередь с затратами на перестройку массива сложность l(n) где n  длина массива

// Затем если успею осущетвить очередь иным способом linkedList

const handler = () => {
    console.log('Handler: Что-то делаем');
};


// подписали
emitter.on('event', handler);
emitter.on('event-1', handler);
setTimeout(() => {
    emitter.on('event-3', handler);
}, 200);
emitter.on('event-2', handler);


usualBtn.addEventListener('click', function () {
    // обработали событие
    emitter.emit('event');
});

offUsualBtn.addEventListener('click', function () {
    // отписали
    emitter.off('event', handler);
});


const input = document.getElementById('input');

const autocomplete = new Autocomplete(document.getElementById('autocomplete'),'input__autocomplete_show', 10, data);

input.onkeyup = function (e) {
    autocomplete.suggest(this.value, e);
};

const clear = document.getElementById('clear-search');

clear.addEventListener('click', function () {
    //TODO: проверь не потекли ли методы в классе, скорее всего да
    input.value = '';
    autocomplete.hide();
    input.focus();
});




