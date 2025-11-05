
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";

describe("Customer domain events", () => {
    it("should notify customer created handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const handler1 = new EnviaConsoleLog1Handler();
        const handler2 = new EnviaConsoleLog2Handler();
        const spyHandler1 = jest.spyOn(handler1, "handle");
        const spyHandler2 = jest.spyOn(handler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "c1",
            name: "Customer 1"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyHandler1).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyHandler2).toHaveBeenCalledWith(customerCreatedEvent);
    });

    it("should notify customer address changed handler", () => {
        const eventDispatcher = new EventDispatcher();
        const handler = new EnviaConsoleLogHandler();
        const spyHandler = jest.spyOn(handler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", handler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "c1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "Zipcode 1",
                city: "City 1"
            }
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyHandler).toHaveBeenCalledWith(customerAddressChangedEvent);
    });
});