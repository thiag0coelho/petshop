import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (x) => x.items)
  order: Order;

  @ManyToOne(() => Product, (x) => x)
  product: Product;

  @Column('decimal')
  price: number;

  @Column('decimal')
  quantity: number;
}
