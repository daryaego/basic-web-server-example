import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BalanceActionEntity } from './balance-action.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToMany(() => BalanceActionEntity, (balanceAction) => balanceAction.user, {
    eager: true,
    cascade: true,
  })
  balanceActions: BalanceActionEntity[];
}
