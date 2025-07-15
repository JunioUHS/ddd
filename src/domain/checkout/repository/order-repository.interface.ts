import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {
    create(entity: Order): Promise<void>;
    update(entity: Order): Promise<void>;
    findById(id: string): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    delete(id: string): Promise<void>;
}