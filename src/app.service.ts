import { Injectable, NotFoundException } from '@nestjs/common';
import { BalanceDepositDto } from './dtos/balance-deposit.dto';
import { UserDatabaseEntity } from './database/entities/user.database.entity';
import { BalanceActionDatabaseEntity } from './database/entities/balance-action.database.entity';
import { BalanceActionEnum } from '~/domain/balance-action.entity';

@Injectable()
export class AppService {
  async balanceDeposit(dto: BalanceDepositDto) {
    const user = await UserDatabaseEntity.findOneBy({ id: dto.userId });
    if (!user) return this.checkUserFound(dto.userId);
    user.balance += dto.amount;
    user.balanceActions.push(
      new BalanceActionDatabaseEntity(
        null,
        dto.userId,
        BalanceActionEnum.BalanceDeposit,
        dto.amount,
        new Date(),
      ),
    );
    await user.save();
  }

  async getUserBalance(userId: number): Promise<number> {
    const user = await UserDatabaseEntity.findOneBy({ id: userId });
    if (!user) this.checkUserFound(userId);
    return user?.balance as number;
  }

  private checkUserFound(userId: number) {
    throw new NotFoundException(`User entity id=${userId} was not found`);
  }
}
