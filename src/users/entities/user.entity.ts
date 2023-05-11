import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

import { CategoryEntity } from '../../categories/entities/category.entity';
import { Roles } from '../../utility/common/user-roles.enum';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  //   @Column({ type: 'simple-array', default: Roles.USER })
  @Column({ type: 'varchar', default: Roles.USER })
  roles: Roles[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
  categories: CategoryEntity[];
}
