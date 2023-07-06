import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

import { UserEntity } from 'src/users/entities/user.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrdersProductsEntity } from './orders-products.entity';
import { ShippingEntity } from './shipping.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderAt: Timestamp;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: string;

  @Column({ nullable: true })
  shippedAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  updatedBy: UserEntity;

  @OneToOne(() => ShippingEntity, (shipping) => shipping.order, { cascade: true })
  @JoinColumn()
  shippingAddress: ShippingEntity;

  @OneToMany(() => OrdersProductsEntity, (op) => op.order, { cascade: true })
  products: OrdersProductsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
