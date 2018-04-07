import {LinkedList} from "./list";

export const emitter = {
    // @TODO - events как раз и должен быть структурой данных - очерь с односвязным / мб двусвязным списком
    // event: string; handler : function
    // events: new LinkedList(),
    // // event: string; handler : function
    //
    // on: function(event, handler) {
    //     this.events.add({event, handler});
    //     console.log(`Emitter: Подписка на ${event} событие`);
    // },
    // // event: string; handler : function
    // off: function(event, handler) {
    //     const events = this.events.get(event);
    //     if (events && events.length){
    //         this.events.set(event, events.filter(h => h !== handler)); // вроде нет никакого бенефита по использованию map здесь
    //         console.log(`Emitter: Подписка на ${event} событие была удалена`);
    //     }
    // },
    // // event : string
    // emit: function(event) {
    //     console.log(event);
    //     console.log(this.events);
    //     this.events.forEach(event)
    //     // const events = this.events.get(event);
    //     // if (events && events.length){
    //     //     events.forEach((call) => {
    //     //         console.log(`Emitter: Обработка ${event} события`);
    //     //         call();
    //     //     });
    //     // }
    // }

    events: new Map(),

    on: function(event, handler) {
        // const start = performance.now();
        if (!this.events.has(event)){
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
        // console.log(`Emitter: Подписка на ${event} событие ${handler.name}`);
        // const end = performance.now();
        // console.log(`-----------✍️ ✍️ ✍️ ✍️ ✍️ ✍️ ✍️ ✍️--------------`);
        // console.log(`Подписка на один эвент занимает ${(end - start).toFixed(2)} мс`);
    },
    // // event: string; handler : function
    off: function(event, handler) {
        const start = performance.now();
        const events = this.events.get(event);
        if (events && events.length){
            const index = events.indexOf(handler);
            if (index !== -1){
                events.splice(index, 1);
            }
            if (events.length === 0){
                this.events.delete(event);
                //console.log(`Emitter: Подписка на ${event} событие была полностью удалена из эмиттера`);
            }
        }
        const end = performance.now();
        if (events.length > 0){
            console.log(`-----------🔥 🔥 🔥 🔥 🔥 🔥--------------`);
            console.log(`Emitter: Подписка на ${event} событие ${handler.name} была удалена`);
            console.log(`Удаление элемента из массива заняло ${(end - start).toFixed(2)} мс`);
        }
    },
    // // handler : function
    emit: function(event) {
        const start = performance.now();
        const events = this.events.get(event);
        if (events && events.length){
            events.forEach(async (handler) => {
                //console.log(`Emitter: Обработка ${event} события ${handler.name}`);
                await handler();
            });
        }
        const end = performance.now();
        console.log(`-----------🛠️ 🛠 🛠 🛠 🛠 --------------`);
        console.log(`Вызов всех эвентов занял ${(end - start).toFixed(2)} мс`);
    }
};