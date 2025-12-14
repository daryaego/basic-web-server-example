import { Inject, Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserBalanceQuery } from './get-user-balance.query';
import { IUserRepository } from '~/database/repositories/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '~/base/keys';

@Injectable()
@QueryHandler(GetUserBalanceQuery)
export class GetUserBalanceQueryHandler implements IQueryHandler<GetUserBalanceQuery> {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: IUserRepository;

  async execute(query: GetUserBalanceQuery): Promise<number> {
    const { userId } = query;
    const user = await this.userRepo.getById(userId);
    return user.balance;
  }
}
