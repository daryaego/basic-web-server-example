import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BalanceDepositDto {
  @ApiProperty({
    description: 'The ID of the user to top up balance',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'The amount to add to the user balance',
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
