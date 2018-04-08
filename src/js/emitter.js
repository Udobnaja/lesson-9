import {emitter} from "./modules/emitter/index";

const usualBtn = document.getElementById('usual-button');
const offAsyncBtn = document.getElementById('off-async-button');
const offUsualBtn = document.getElementById('off-usual-button');

const timerDelay = 200;
const limit = 5; // видно только на 100000 как различается удаление

const handlers = [
    function handler() {
        console.log('Handler: Что-то делаем Синхронно ');
    },
    function asyncHandler() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    console.log('Handler: Что-то делаем Асинхронно: ')
                );
            }, timerDelay);
        });

    }
];


let counter = 0;
const start = performance.now();
while (counter < limit) {
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