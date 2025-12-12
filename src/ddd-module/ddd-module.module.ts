import { Module } from '@nestjs/common';
import { GetUserBalanceController } from './controllers/get-user-balance/get-user-balance.controller';
import { BalanceDepositController } from './controllers/balance-deposit/balance-deposit.controller';
import { BalanceDepositCommandHandler } from './handlers/commands/balance-deposit/balance-deposit.command-handler';
import { GetUserBalanceQueryHandler } from './handlers/queries/get-user-balance/get-user-balance.query-handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [GetUserBalanceController, BalanceDepositController],
  providers: [GetUserBalanceQueryHandler, BalanceDepositCommandHandler],
})
export class DddModuleModule {}
