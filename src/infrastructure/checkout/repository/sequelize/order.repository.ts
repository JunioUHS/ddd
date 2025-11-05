import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        }, {
            include: [{ model: OrderItemModel }],
        });
    }

    async update(entity: Order): Promise<void> {
        const orderModel = await OrderModel.findOne({
            where: { id: entity.id },
            include: [{ model: OrderItemModel }],
        });

        if (!orderModel) {
            throw new Error("Order not found");
        }

        const sequelize = OrderModel.sequelize;
        const transaction = await (sequelize ? sequelize.transaction() : Promise.resolve(null));

        try {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: transaction || undefined,
            });

            const itemsData = entity.items.map(item => ({
                id: item.id,
                order_id: entity.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }));

            if (itemsData.length > 0) {
                await OrderItemModel.bulkCreate(itemsData, { transaction: transaction || undefined });
            }

            orderModel.total = entity.total();
            await orderModel.save({ transaction: transaction || undefined });

            if (transaction) await transaction.commit();
        } catch (err) {
            if (transaction) await transaction.rollback();
            throw err;
        }
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel }],
        });

        if (!orderModel) {
            throw new Error("Order not found");
        }

        const items = orderModel.items.map(itemModel => {
            return new OrderItem(
                itemModel.id,
                itemModel.product_id,
                itemModel.name,
                itemModel.price,
                itemModel.quantity
            );
        });

        return new Order(
            orderModel.id,
            orderModel.customer_id,
            items
        );
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        });

        return orderModels.map(orderModel => {
            const items = orderModel.items.map(itemModel => {
                return new OrderItem(
                    itemModel.id,
                    itemModel.product_id,
                    itemModel.name,
                    itemModel.price,
                    itemModel.quantity
                );
            });

            return new Order(
                orderModel.id,
                orderModel.customer_id,
                items
            );
        });
    }
}