import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopUpBalance } from './dtos/top-up-user-balance.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getUserBalance', () => {
    it('should return user balance', async () => {
      const mockBalance = 100;
      jest.spyOn(appService, 'getUserBalance').mockResolvedValue(mockBalance);

      const result = await appController.getUserBalance(1);
      expect(result).toBe(mockBalance);
      expect(appService.getUserBalance).toHaveBeenCalledWith(1);
    });
  });

  describe('balanceDeposit', () => {
    it('should call balanceDeposit on service', async () => {
      const dto: TopUpBalance = { userId: 1, amount: 50 };
      jest.spyOn(appService, 'balanceDeposit').mockResolvedValue(undefined);

      await appController.balanceDeposit(dto);
      expect(appService.balanceDeposit).toHaveBeenCalledWith(dto);
    });
  });
});
