import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { UserDatabaseEntity } from './user.database.entity';
import { BalanceActionEnum } from '~/domain/balance-action.entity';

@Entity('balance_action')
export class BalanceActionDatabaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDatabaseEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserDatabaseEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  action: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  ts: Date;

  constructor(
    id: number | null,
    userId: number,
    action: BalanceActionEnum,
    amount: number,
    ts: Date,
  ) {
    super();
    if (id) this.id = id;
    this.userId = userId;
    this.action = action;
    this.amount = amount;
    this.ts = ts;
  }
}
