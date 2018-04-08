import {LinkedList} from './list';
import {EventMaps} from './map';

// в эмиттер можно написать ручку, мол с каким эмиттером его запускать

export const emitter = {
    linkedEvents: new LinkedList(),
    events: new EventMaps(),
    on: function (event, handler) {
        this.events.add({event, handler});
        this.linkedEvents.add({event, handler});
    },
    off: function (event, handler) {

        const start = performance.now();
        this.events.remove({event, handler});
        const end = performance.now();

        const start1 = performance.now();
        this.linkedEvents.remove({event, handler});
        const end1 = performance.now();

        console.log(`
            🔥 Удаление элемента из массива заняло 
            ${(end - start).toFixed(2)} мс против ${(end1 - start1).toFixed(2)} мс`);
    },
    emit: function (event) {
        const start = performance.now();
        this.events.forEach(event);
        const end = performance.now();

        const start1 = performance.now();
        this.linkedEvents.forEach(event);
        const end1 = performance.now();

        console.log(`
            🛠 Вызов всех эвентов занял 
               ${(end - start).toFixed(2)} мс против ${(end1 - start1).toFixed(2)} мс`);
    }
};
