import { Test, TestingModule } from '@nestjs/testing';
import { BalanceDepositController } from './balance-deposit.controller';
import { CqrsModule } from '@nestjs/cqrs';

describe('BalanceDepositController', () => {
  let controller: BalanceDepositController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [BalanceDepositController],
    }).compile();

    controller = module.get<BalanceDepositController>(BalanceDepositController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
