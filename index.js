import './src/styles.scss';
import {emitter} from "./src/modules/emitter/index";
import {data} from "./db/streets";
import {suggest, Autocomplete} from "./src/modules/suggest/index";

const usualBtn = document.getElementById('usual-button');
const offAsyncBtn = document.getElementById('off-async-button');
const offUsualBtn = document.getElementById('off-usual-button');

const timerDelay = 200;

const handlers = [
    function handler() {
        // console.log('Handler: Что-то делаем: ');
    },
    function asyncHandler() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Handler: Что-то делаем Асинхронно: ');
                // console.log('Handler: Что-то делаем Асинхронно: ');
            }, timerDelay);
        })

    }
];

const limit = 2; // видно только на 100000 как различается удаление
let counter = 0;
const start = performance.now();
while (counter < limit){
    const index = Math.floor(Math.random() * (handlers.length));
    emitter.on('event', handlers[index]);
    counter++;
}
const end = performance.now();
console.log(`✍️ Подписка на все эвенты занимает ${(end - start).toFixed(2)} мс`);


usualBtn.addEventListener('click', () => {
    emitter.emit('event');
});

offUsualBtn.addEventListener('click', () => {
    emitter.off('event', handlers[0]);
});

offAsyncBtn.addEventListener('click', () => {
    emitter.off('event', handlers[1]);
});

const input = document.getElementById('input');

const autocomplete = new Autocomplete(document.getElementById('autocomplete'), 'input__autocomplete_show', 10, data);

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




