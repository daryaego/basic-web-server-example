import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Tags } from '~/base/api-tags';
import { TopUpBalanceDto } from 'src/dtos/top-up-user-balance.dto';
import { BalanceDepositCommand } from '~/handlers/commands/balance-deposit/balance-deposit.command';
import { api, ModulePrefix } from '~/base/api-paths';

@ApiTags(Tags.DDDBalanceModule)
@Controller(`${ModulePrefix.DDD}/${api.v1.balance}`)
export class BalanceDepositController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async execute(@Body() body: TopUpBalanceDto) {
    await this.commandBus.execute(
      new BalanceDepositCommand(body.userId, body.amount),
    );
  }
}
