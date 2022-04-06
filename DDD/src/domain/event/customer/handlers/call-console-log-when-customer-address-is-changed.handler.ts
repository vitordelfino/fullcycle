import { Customer } from "../../../entity/customer";
import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

export class CallConsoleLogWhenCustomerAddressIsChanged implements EventHandlerInterface {
  handle(event: EventInterface): void {
    const customer = event.eventData as Customer;
    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para:`, customer.address);
  }
}
