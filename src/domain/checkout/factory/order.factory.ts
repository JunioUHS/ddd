import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        productId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    public static create(props: OrderFactoryProps): Order {
        const items = props.items.map(itemProps => {
            return new OrderItem(
                itemProps.id,
                itemProps.productId,
                itemProps.name,
                itemProps.quantity,
                itemProps.price
            );
        });

        return new Order(
            props.id,
            props.customerId,
            items
        );
    }
}