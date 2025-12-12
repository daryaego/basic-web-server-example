import { Test, TestingModule } from '@nestjs/testing';
import { GetUserBalanceController } from './get-user-balance.controller';
import { CqrsModule } from '@nestjs/cqrs';

describe('GetUserBalanceController', () => {
  let controller: GetUserBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [GetUserBalanceController],
    }).compile();

    controller = module.get<GetUserBalanceController>(GetUserBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
