import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequilize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Address from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequilize/product.repository";
import Product from "../../../../domain/product/entity/product";
import Customer from "../../../../domain/customer/entity/customer";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepository from "./order.repository";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    order_id: order.id,
                    product_id: product.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                },
            ],
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 100);
        const product2 = new Product("p2", "Product 2", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("i1", product1.id, product1.name, product1.price, 2);
        const orderRepository = new OrderRepository();
        const order = new Order("o1", customer.id, [orderItem1]);
        await orderRepository.create(order);

        const updatedItem1 = new OrderItem(orderItem1.id, product1.id, product1.name, product1.price, 3);
        const newItem = new OrderItem("i2", product2.id, product2.name, product2.price, 1);
        const updatedOrder = new Order(order.id, order.customerId, [updatedItem1, newItem]);

        await orderRepository.update(updatedOrder);

        const orderModel = await OrderModel.findOne({
            where: { id: updatedOrder.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: updatedOrder.id,
            customer_id: customer.id,
            total: updatedOrder.total(),
            items: [
                {
                    id: updatedItem1.id,
                    order_id: updatedOrder.id,
                    product_id: product1.id,
                    name: updatedItem1.name,
                    price: updatedItem1.price,
                    quantity: updatedItem1.quantity,
                },
                {
                    id: newItem.id,
                    order_id: updatedOrder.id,
                    product_id: product2.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: newItem.quantity,
                },
            ],
        });

        const orderResult = await orderRepository.find(updatedOrder.id);
        expect(orderResult).toStrictEqual(updatedOrder);
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);

        expect(order).toStrictEqual(orderResult);
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.id, product.name, product.price, 2);
        const orderItem2 = new OrderItem("2", product.id, product.name, product.price, 3);
        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem1, orderItem2]);
        await orderRepository.create(order);

        const orders = await orderRepository.findAll();
        expect(orders).toHaveLength(1);
        expect(orders[0]).toStrictEqual(order);
    });
});