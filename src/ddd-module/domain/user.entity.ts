import { DomainEntity, DomainProps } from '../base/domain-entity';
import {
  BalanceActionEntity,
  BalanceActionEnum,
} from './balance-action.entity';

export interface UserProps extends DomainProps {
  balance: number;
  balanceActions: BalanceActionEntity[];
}

export class UserEntity extends DomainEntity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get balance(): number {
    return this.props.balance;
  }

  public debitFunds(amount: number) {
    this.props.balance += amount;
    this.props.balanceActions.push(
      BalanceActionEntity.create({
        userId: this.id as number,
        action: BalanceActionEnum.BalanceDeposit,
        amount,
      }) as BalanceActionEntity,
    );
  }

  public balanceDeposit(amount: number) {
    this.props.balance -= amount;
    this.props.balanceActions.push(
      BalanceActionEntity.create({
        userId: this.id as number,
        action: BalanceActionEnum.DebitFunds,
        amount,
      }) as BalanceActionEntity,
    );
  }
}
