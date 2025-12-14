import { DomainEntity, DomainProps } from '../base/domain-entity';

export enum BalanceActionEnum {
  BalanceDeposit = 'BALANCE_DEPOSIT',
  DebitFunds = 'DEBIT_FUNDS',
}

export interface BalanceActionProps extends DomainProps {
  userId: number;
  action: BalanceActionEnum;
  amount: number;
  ts: Date;
}

export class BalanceActionEntity extends DomainEntity<BalanceActionProps> {
  constructor(props: BalanceActionProps) {
    if (!Object.values(BalanceActionEnum).includes(props.action)) {
      throw new Error(`Invalid action: ${props.action}`);
    }
    if (props.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    super(props);
  }
}
