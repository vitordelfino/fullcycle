import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import { EventInterface } from "../../../@shared/event/event.interface";
import { Customer } from "../../entity/customer";

export class CallConsoleLogWhenCustomerAddressIsChanged implements EventHandlerInterface {
  handle(event: EventInterface): void {
    const customer = event.eventData as Customer;
    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para:`, customer.address);
  }
}
