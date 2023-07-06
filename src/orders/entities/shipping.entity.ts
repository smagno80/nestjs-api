import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'shippings' })
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  postCode: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @OneToOne(() => OrderEntity, (order) => order.shippingAddress)
  order: OrderEntity;
}
