import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Customer id is required");
    });

    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Customer name is required");
    });

    it("should change name", () => {
        //Arrange
        let customer = new Customer("123", "John");

        //Act
        customer.changeName("Jane");

        //Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {

        let customer = new Customer("123", "John");
        const address = new Address("Street 1", 123, "12345-678", "City");

        customer.address = address;
        customer.activate();

        expect(customer.isActive()).toBeTruthy();
    });

    it("should throw error when address is undefined when activating a customer", () => {

        let customer = new Customer("123", "John");
        expect(() => {
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    it("should deactivate customer", () => {
        
        let customer = new Customer("123", "John");

        customer.deactivate();
        expect(customer.isActive()).toBeFalsy();
    });
});