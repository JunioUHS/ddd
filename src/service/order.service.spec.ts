import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const orderItem1 = new OrderItem("i1", "p1", "Product 1", 10, 1);

        const order = OrderService.placeOrder(customer, [orderItem1]);
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });


    it("should get total of all orders", () => {
        const orderItem1 = new OrderItem("i1", "p1", "Product 1", 100, 1);
        const orderItem2 = new OrderItem("i2", "p2", "Product 2", 200, 2);

        const order1 = new Order("o1", "c1", [orderItem1]);
        const order2 = new Order("o2", "c1", [orderItem2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });

    it("should add reward points", () => {

        const customer = new Customer("c1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});