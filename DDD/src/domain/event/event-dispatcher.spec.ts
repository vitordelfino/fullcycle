import { Address } from "../entity/address";
import { Customer } from "../entity/customer";
import { CustomerAddressChangedEvent } from "./customer/customer-address-changed.event";
import { CustomerCreatedEvent } from "./customer/customer-created.event";
import { CallConsoleLogWhenCustomerAddressIsChanged } from "./customer/handlers/call-console-log-when-customer-address-is-changed.handler";
import { CallConsoleLogWhenCustomerIsCreated2Handler } from "./customer/handlers/call-console-log-when-customer-is-created-2.handler";
import { CallConsoleLogWhenCustomerIsCreated1Handler } from "./customer/handlers/call-console-log-when-customer-is-created-1.handler";
import { EventDispatcher } from "./event-dispatcher";
import { SendEmailWhenProductIsCreatedHandler } from "./product/handler/send-email-when-producted-is-created.handler";
import { ProductCreatedEvent } from "./product/product-created.event";

describe("Domain events tests", () => {

  describe('Product', () => {
    describe('created', () => {
      it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);
      });

      it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
      });

      it('should unregister all events', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);

        eventDispatcher.unreigsterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
      });

      it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
          name: "Product 1",
          description: "Product 1 description",
          price: 10.0,
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handler() será chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
      });
    });
  });

  describe('Customer', () => {
    describe('created', () => {
      it('should notify created customer events', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new CallConsoleLogWhenCustomerIsCreated1Handler();
        const eventHandler2 = new CallConsoleLogWhenCustomerIsCreated2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        const customer = new Customer("1", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
      });
    });
    describe('address updated', () => {
      it('should notify customer address updated events', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CallConsoleLogWhenCustomerAddressIsChanged();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1")
        customer.changeAddress(address);
        const customerCreatedEvent = new CustomerAddressChangedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
      });
    });
  });
});
