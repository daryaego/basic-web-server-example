import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserBalanceQueryHandler } from './get-user-balance.query-handler';
import { GetUserBalanceQuery } from './get-user-balance.query';
import { UserDatabaseEntity } from '~/database/entities/user.database.entity';

describe('GetUserBalanceQueryHandler', () => {
  let handler: GetUserBalanceQueryHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserBalanceQueryHandler],
    }).compile();

    handler = module.get<GetUserBalanceQueryHandler>(
      GetUserBalanceQueryHandler,
    );
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return user balance successfully', async () => {
    const userId = 1;
    const balance = 150;
    const query = new GetUserBalanceQuery(userId);

    const mockUser = {
      id: userId,
      balance,
    };

    const findOneBySpy = jest.spyOn(UserDatabaseEntity, 'findOneBy').mockResolvedValue(mockUser as any);

    const result = await handler.execute(query);

    expect(findOneBySpy).toHaveBeenCalledWith({ id: userId });
    expect(result).toBe(balance);
  });

  it('should throw NotFoundException if user not found', async () => {
    const userId = 1;
    const query = new GetUserBalanceQuery(userId);

    const findOneBySpy = jest.spyOn(UserDatabaseEntity, 'findOneBy').mockResolvedValue(null);

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    expect(findOneBySpy).toHaveBeenCalledWith({ id: userId });
  });
});