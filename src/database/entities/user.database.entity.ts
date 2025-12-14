import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BalanceActionDatabaseEntity } from './balance-action.database.entity';

@Entity('user')
export class UserDatabaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToMany(
    () => BalanceActionDatabaseEntity,
    (balanceAction) => balanceAction.user,
    {
      eager: true,
      cascade: true,
    },
  )
  balanceActions: BalanceActionDatabaseEntity[];
}
