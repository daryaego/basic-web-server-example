import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BalanceDepositCommand } from './balance-deposit.command';
import { UserEntity } from '~/database/entities/user.entity';
import {
  BalanceActionEntity,
  BalanceActionEnum,
} from '~/database/entities/balance-action.entity';

@Injectable()
@CommandHandler(BalanceDepositCommand)
export class BalanceDepositCommandHandler implements ICommandHandler<BalanceDepositCommand> {
  async execute(command: BalanceDepositCommand): Promise<void> {
    const { userId, amount } = command;
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User entity id=${userId} was not found`);
    }
    user.balance += amount;
    user.balanceActions.push(
      new BalanceActionEntity(userId, BalanceActionEnum.BalanceDeposit, amount),
    );
    await user.save();
  }
}
