import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserBalanceQuery } from './get-user-balance.query';
import { UserEntity } from '~/database/entities/user.entity';

@Injectable()
@QueryHandler(GetUserBalanceQuery)
export class GetUserBalanceQueryHandler implements IQueryHandler<GetUserBalanceQuery> {
  async execute(query: GetUserBalanceQuery): Promise<number> {
    const { userId } = query;
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User entity id=${userId} was not found`);
    }
    return user.balance;
  }
}
