import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany
} from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => {
        const OrderItemModel = require('./order-item.model').default;
        return OrderItemModel;
    })
    declare items: any[];

    @Column({ allowNull: false })
    declare total: number;
}