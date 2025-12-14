import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BalanceDepositCommand } from './balance-deposit.command';
import { UserDatabaseEntity } from '~/database/entities/user.database.entity';
import { IUserRepository } from '~/database/repositories/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '~/base/keys';

@Injectable()
@CommandHandler(BalanceDepositCommand)
export class BalanceDepositCommandHandler implements ICommandHandler<BalanceDepositCommand> {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: IUserRepository;

  async execute(command: BalanceDepositCommand): Promise<void> {
    const { userId, amount } = command;
    const user = await this.userRepo.getById(userId);
    const userDb = await UserDatabaseEntity.findOneBy({ id: userId });
    if (!userDb) {
      throw new NotFoundException(`User entity id=${userId} was not found`);
    }

    user.balanceDeposit(amount);
    await userDb.save();
  }
}
