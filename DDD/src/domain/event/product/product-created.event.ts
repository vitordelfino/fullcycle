import { EventInterface } from "../@shared/event.interface";

export class ProductCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: unknown;

    constructor(eventData: unknown) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
