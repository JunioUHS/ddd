import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequilize/product.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => {
        const OrderModel = require('./order.model').default;
        return OrderModel;
    })
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => {
        const OrderModel = require('./order.model').default;
        return OrderModel;
    })
    declare order: any;

    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
}