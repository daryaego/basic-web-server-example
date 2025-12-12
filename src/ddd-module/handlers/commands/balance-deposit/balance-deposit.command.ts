import { ICommand } from '@nestjs/cqrs';

export class BalanceDepositCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly amount: number,
  ) {}
}
