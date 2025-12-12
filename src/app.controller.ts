import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { TopUpBalanceDto } from './dtos/top-up-user-balance.dto';
import { Tags } from '~/base/api-tags';
import { api, ModulePrefix } from '~/base/api-paths';

@ApiTags(Tags.RegularBalanceModule)
@Controller(`${ModulePrefix.Regular}/${api.v1.balance}`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({ status: 200, description: 'User balance', type: Number })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserBalance(
    @Param(
      'userId',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    userId: number,
  ): Promise<number> {
    return this.appService.getUserBalance(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Top up user balance' })
  @ApiBody({ type: TopUpBalanceDto })
  @ApiResponse({ status: 201, description: 'Balance topped up successfully' })
  @ApiResponse({ status: 422, description: 'Unprocessable entity' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async balanceDeposit(@Body() dto: TopUpBalanceDto) {
    await this.appService.balanceDeposit(dto);
  }
}
