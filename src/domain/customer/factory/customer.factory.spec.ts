import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John Doe");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("123 Main St", 100, "12345-678", "City");
        const customer = CustomerFactory.createWithAddress("Jane Doe", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jane Doe");
        expect(customer.Address).toBe(address);
    });
});