import Order from "./order";
import OrderItem from "./order_item";


describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", () => {

        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when items is empty", () => {

        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Items are required");
    });

    it("should throw error when order item id is empty", () => {

        expect(() => {
            let orderItem = new OrderItem("", "Product 1", "Item 1", 100, 2);
        }).toThrow("Id is required");
    });

    it("should throw error when order item productId is empty", () => {

        expect(() => {
            let orderItem = new OrderItem("123", "", "Item 1", 100, 2);
        }).toThrow("ProductId is required");
    });

    it("should throw error when order item name is empty", () => {

        expect(() => {
            let orderItem = new OrderItem("123", "123", "", 100, 2);
        }).toThrow("Name is required");
    });

    it("should throw error when price is less or equal to zero", () => {

        expect(() => {
            let orderItem = new OrderItem("123", "123", "Item 1", 0, 2);
        }).toThrow("Price must be greater than zero");
    });

    it("should throw error when quantity is less or equal to zero", () => {

        expect(() => {
            let orderItem = new OrderItem("123", "123", "Item 1", 100, 0);
        }).toThrow("Quantity must be greater than zero");
    });

    it("should calculate order item total", () => {

        let orderItem = new OrderItem("123", "123", "Item 1", 100, 2);
        
        expect(orderItem.orderItemTotal()).toBe(200);
    });

    it("should calculate total", () => {

        const item1 = new OrderItem("1", "Product 1", "Item 1", 100, 2);
        const item2 = new OrderItem("2", "Product 2", "Item 2", 200, 2);

        let order = new Order("123", "123", [item1]);

        expect(order.total()).toBe(200);

        let order2 = new Order("123", "123", [item1, item2]);
        
        expect(order2.total()).toBe(600);
    });
});