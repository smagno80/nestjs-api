import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

import { CategoryEntity } from '../../categories/entities/category.entity';
import { ReviewEntity } from '../../reviews/entities/review.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  stock: number;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.id)
  addedBy: UserEntity;

  @ManyToOne(() => CategoryEntity, (cat) => cat.id)
  category: CategoryEntity;

  //   @OneToMany(() => ReviewEntity, (rev) => rev.product)
  //   reviews: ReviewEntity[];

  //   @OneToMany(() => OrderProductEntity, (op) => op.)
  //   products: OrderProductEntity[];
}
