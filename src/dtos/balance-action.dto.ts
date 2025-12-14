import { ApiProperty } from '@nestjs/swagger';
import { BalanceActionEnum } from '~/domain/balance-action.entity';

export class BalanceActionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ enum: BalanceActionEnum })
  action: BalanceActionEnum;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  ts: Date;
}
