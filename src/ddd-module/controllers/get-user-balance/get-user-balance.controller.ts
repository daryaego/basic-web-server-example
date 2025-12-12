import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Tags } from '~/base/api-tags';
import { GetUserBalanceQuery } from '../../handlers/queries/get-user-balance/get-user-balance.query';
import { api, ModulePrefix } from '~/base/api-paths';

@ApiTags(Tags.DDDBalanceModule)
@Controller(`${ModulePrefix.DDD}/${api.v1.balance}`)
export class GetUserBalanceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId')
  async execute(@Param('userId') userId: number): Promise<number> {
    return this.queryBus.execute(new GetUserBalanceQuery(userId));
  }
}
