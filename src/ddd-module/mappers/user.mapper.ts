import { Mapper } from '../base/mapper';
import { UserDto } from '../../dtos/user.dto';
import { UserEntity } from '../domain/user.entity';
import { UserDatabaseEntity } from '../../database/entities/user.database.entity';

export class UserMapper extends Mapper<
  UserDto,
  UserEntity,
  UserDatabaseEntity
> {
  toDomain(databaseEntity: UserDatabaseEntity): UserEntity {
    return new UserEntity({
      id: databaseEntity.id,
      balance: databaseEntity.balance,
      balanceActions: [], // Simplified for now
    });
  }

  toDatabase(domainEntity: UserEntity): UserDatabaseEntity {
    const dbEntity = new UserDatabaseEntity();
    dbEntity.id = domainEntity.id || 0;
    dbEntity.balance = domainEntity.balance;
    // balanceActions mapping would require BalanceActionMapper
    return dbEntity;
  }

  toDto(domainEntity: UserEntity): UserDto {
    return {
      id: domainEntity.id || 0,
      balance: domainEntity.balance,
    };
  }
}
