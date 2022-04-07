import { EventInterface } from "../../@shared/event/event.interface";

export class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: unknown;

  constructor(data: unknown) {
    this.dataTimeOccurred = new Date();
    this.eventData = data;
  }
}
