import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserBalanceQueryHandler } from './get-user-balance.query-handler';
import { GetUserBalanceQuery } from './get-user-balance.query';
import { UserEntity } from '~/database/entities/user.entity';

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

    const findOneBySpy = jest.spyOn(UserEntity, 'findOneBy').mockResolvedValue(mockUser as any);

    const result = await handler.execute(query);

    expect(findOneBySpy).toHaveBeenCalledWith({ id: userId });
    expect(result).toBe(balance);
  });

  it('should throw NotFoundException if user not found', async () => {
    const userId = 1;
    const query = new GetUserBalanceQuery(userId);

    const findOneBySpy = jest.spyOn(UserEntity, 'findOneBy').mockResolvedValue(null);

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    expect(findOneBySpy).toHaveBeenCalledWith({ id: userId });
  });
});