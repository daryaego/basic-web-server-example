import { Injectable, NotFoundException } from '@nestjs/common';
import { TopUpBalanceDto } from './dtos/top-up-user-balance.dto';
import { UserEntity } from './database/entities/user.entity';
import {
  BalanceActionEntity,
  BalanceActionEnum,
} from './database/entities/balance-action.entity';

@Injectable()
export class AppService {
  async balanceDeposit(dto: TopUpBalanceDto) {
    const user = await UserEntity.findOneBy({ id: dto.userId });
    if (!user) return this.checkUserFound(dto.userId);
    user.balance += dto.amount;
    user.balanceActions.push(
      new BalanceActionEntity(
        dto.userId,
        BalanceActionEnum.BalanceDeposit,
        dto.amount,
      ),
    );
    await user.save();
  }

  async getUserBalance(userId: number): Promise<number> {
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) this.checkUserFound(userId);
    return user?.balance as number;
  }

  private checkUserFound(userId: number) {
    throw new NotFoundException(`User entity id=${userId} was not found`);
  }
}
