import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

const customer = new Customer('123', 'John');
const address = new Address('Rua 19', 19, '00000-000', 'Coronel Fabriciano');
customer.address = address;
customer.activate();

// const item1 = new OrderItem('1', 'Item 1', 100);
// const item2 = new OrderItem('2', 'Item 2', 200);
// const order = new Order('123', '123', [item1, item2]);