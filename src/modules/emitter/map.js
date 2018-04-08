export class EventMaps {
    constructor() {
        this.events = new Map();
    }

    add({event, handler}) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
    }

    remove({event, handler}) {
        const events = this.events.get(event);
        if (events && events.length) {
            console.log(events);
            const index = events.indexOf(handler);
            if (index !== -1) {
                events.splice(index, 1);
            }
            if (events.length === 0) {
                this.events.delete(event);
                // console.log(`Подписка на ${event} событие была полностью удалена`);
            }
        }
    }

    forEach(event) {
        const events = this.events.get(event);
        if (events && events.length) {
            events.forEach((handler) => {
                // console.log(`Обработка ${event} события ${handler.name}`);
                handler();
            });
        }
    }
}
