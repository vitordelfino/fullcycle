import { EventInterface } from "../@shared/event.interface";

export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: unknown;

  constructor(data: unknown) {
    this.dataTimeOccurred = new Date();
    this.eventData = data;
  }
}
