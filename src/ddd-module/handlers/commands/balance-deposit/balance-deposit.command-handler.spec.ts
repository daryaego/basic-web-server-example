import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BalanceDepositCommandHandler } from './balance-deposit.command-handler';
import { BalanceDepositCommand } from './balance-deposit.command';
import { UserEntity } from '~/database/entities';
import {
  BalanceActionEntity,
  BalanceActionEnum,
} from '~/database/entities/balance-action.entity';

describe('BalanceDepositCommandHandler', () => {
  let handler: BalanceDepositCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceDepositCommandHandler],
    }).compile();

    handler = module.get<BalanceDepositCommandHandler>(
      BalanceDepositCommandHandler,
    );
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should deposit balance successfully', async () => {
    const userId = 1;
    const amount = 100;
    const initialBalance = 50;
    const command = new BalanceDepositCommand(userId, amount);

    const mockUser = {
      id: userId,
      balance: initialBalance,
      balanceActions: [],
      save: jest.fn(),
    };

    const findOneBySpy = jest
      .spyOn(UserEntity, 'findOneBy')
      .mockResolvedValue(mockUser as any);

    await handler.execute(command);

    expect(findOneBySpy).toHaveBeenCalledWith({ id: userId });
    expect(mockUser.balance).toBe(initialBalance + amount);
    expect(mockUser.balanceActions).toContainEqual(
      new BalanceActionEntity(userId, BalanceActionEnum.BalanceDeposit, amount),
    );
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('should throw NotFoundException if user not found', async () => {
    const userId = 1;
    const amount = 100;
    const command = new BalanceDepositCommand(userId, amount);

    const findOneBySpy = jest
      .spyOn(UserEntity, 'findOneBy')
      .mockResolvedValue(null);

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    expect(findOneBySpy).toHaveBeenCalledWith({ id: userId });
  });
});
