import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order Factory unit test", () => {
    it("should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    productId: uuid(),
                    name: "Product 1",
                    quantity: 2,
                    price: 50,
                },
            ],
        }

        const order = OrderFactory.create(orderProps);
        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
});