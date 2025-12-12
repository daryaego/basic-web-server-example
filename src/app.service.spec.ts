import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './database/entities/user.entity';
import { TopUpBalanceDto } from './dtos/top-up-user-balance.dto';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserBalance', () => {
    it('should return user balance when user exists', async () => {
      const mockUser = { id: 1, balance: 100 };
      jest.spyOn(UserEntity, 'findOneBy').mockResolvedValue(mockUser as any);

      const result = await service.getUserBalance(1);
      expect(result).toBe(100);
      expect(UserEntity.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      jest.spyOn(UserEntity, 'findOneBy').mockResolvedValue(null);

      await expect(service.getUserBalance(1)).rejects.toThrow(
        NotFoundException,
      );
      expect(UserEntity.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('balanceDeposit', () => {
    it('should top up balance and save user when user exists', async () => {
      const mockUser = {
        id: 1,
        balance: 100,
        balanceActions: [],
        save: jest.fn().mockResolvedValue(undefined),
      };
      jest.spyOn(UserEntity, 'findOneBy').mockResolvedValue(mockUser as any);

      const dto: TopUpBalanceDto = { userId: 1, amount: 50 };
      await service.balanceDeposit(dto);

      expect(mockUser.balance).toBe(150);
      expect(mockUser.balanceActions).toHaveLength(1);
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when user does not exist', async () => {
      jest.spyOn(UserEntity, 'findOneBy').mockResolvedValue(null);

      const dto: TopUpBalanceDto = { userId: 1, amount: 50 };
      await expect(service.balanceDeposit(dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
