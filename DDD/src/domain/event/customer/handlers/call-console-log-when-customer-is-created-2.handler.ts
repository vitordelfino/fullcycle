import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

export class CallConsoleLogWhenCustomerIsCreated2Handler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log(`Esse é o segundo console.log do evento`, event)
  }
}
