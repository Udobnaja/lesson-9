import {LinkedList} from "./list";
export const emitter = {
    // @TODO - events как раз и должен быть структурой данных - очерь с односвязным / мб двусвязным списком
    // event: string; handler : function
    events: new LinkedList(),
    // event: string; handler : function

    on: function(event, handler) {
        this.events.add({event, handler});
        console.log(`Emitter: Подписка на ${event} событие`);
    },
    // event: string; handler : function
    off: function(event, handler) {
        const events = this.events.get(event);
        if (events && events.length){
            this.events.set(event, events.filter(h => h !== handler)); // вроде нет никакого бенефита по использованию map здесь
            console.log(`Emitter: Подписка на ${event} событие была удалена`);
        }
    },
    // event : string
    emit: function(event) {
        console.log(event);
        console.log(this.events);
        this.events.forEach(event)
        // const events = this.events.get(event);
        // if (events && events.length){
        //     events.forEach((call) => {
        //         console.log(`Emitter: Обработка ${event} события`);
        //         call();
        //     });
        // }
    }


    // on: function(event, handler) {
    //     if (!this.events.has(event)){
    //         this.events.set(event, []);
    //     }
    //     this.events.get(event).push(handler);
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
    // // handler : function
    // emit: function(event) {
    //     const events = this.events.get(event);
    //     if (events && events.length){
    //         events.forEach((call) => {
    //             console.log(`Emitter: Обработка ${event} события`);
    //             call();
    //         });
    //     }
    // }
};