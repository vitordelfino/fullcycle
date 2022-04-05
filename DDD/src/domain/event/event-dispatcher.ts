import { EventDispatcherInterface } from "./@shared/event-dispatcher";
import { EventHandlerInterface } from "./@shared/event-handler.interface";
import { EventInterface } from "./@shared/event.interface";

export class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: Record<string, EventHandlerInterface[]> = {};

    get getEventHandlers(): Record<string, EventHandlerInterface[]> {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if(this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach(eventHandler => {
                eventHandler.handle(event);
            });
        }
    }
    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if(this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if(index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }
    unreigsterAll(): void {
        this.eventHandlers = {};
    }

}
