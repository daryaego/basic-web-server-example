import { Module } from '@nestjs/common';
import { GetUserBalanceController } from './controllers/get-user-balance/get-user-balance.controller';
import { BalanceDepositController } from './controllers/balance-deposit/balance-deposit.controller';
import { BalanceDepositCommandHandler } from './handlers/commands/balance-deposit/balance-deposit.command-handler';
import { GetUserBalanceQueryHandler } from './handlers/queries/get-user-balance/get-user-balance.query-handler';
import { CqrsModule } from '@nestjs/cqrs';
import {
  USER_BALANCE_ACTION_MAPPER,
  USER_MAPPER,
  USER_REPOSITORY,
} from './base/keys';
import { UserMapper } from './mappers/user.mapper';
import { BalanceActionMapper } from './mappers/balance-action.mapper';
import { UserRepository } from '~/database/repositories/implementations/user.repository';

@Module({
  imports: [CqrsModule],
  controllers: [GetUserBalanceController, BalanceDepositController],
  providers: [
    { provide: USER_MAPPER, useClass: UserMapper },
    { provide: USER_BALANCE_ACTION_MAPPER, useClass: BalanceActionMapper },
    { provide: USER_REPOSITORY, useClass: UserRepository },
    GetUserBalanceQueryHandler,
    BalanceDepositCommandHandler,
  ],
})
export class DddModule {}
