import { Mapper } from '../base/mapper';
import { BalanceActionDto } from '../../dtos/balance-action.dto';
import {
  BalanceActionEntity,
  BalanceActionEnum,
} from '../domain/balance-action.entity';
import { BalanceActionDatabaseEntity } from '../../database/entities/balance-action.database.entity';

export class BalanceActionMapper extends Mapper<
  BalanceActionDto,
  BalanceActionEntity,
  BalanceActionDatabaseEntity
> {
  toDomain(databaseEntity: BalanceActionDatabaseEntity): BalanceActionEntity {
    return new BalanceActionEntity({
      id: databaseEntity.id,
      userId: databaseEntity.userId,
      action: databaseEntity.action as BalanceActionEnum,
      amount: databaseEntity.amount,
      ts: databaseEntity.ts,
    });
  }

  toDatabase(domainEntity: BalanceActionEntity): BalanceActionDatabaseEntity {
    const props = domainEntity.getProps;
    const dbEntity = new BalanceActionDatabaseEntity(
      domainEntity.id,
      props.userId,
      props.action,
      props.amount,
      props.ts,
    );
    if (domainEntity.id) dbEntity.id = domainEntity.id;
    dbEntity.ts = props.ts;
    return dbEntity;
  }

  toDto(domainEntity: BalanceActionEntity): BalanceActionDto {
    const props = domainEntity.getProps;
    return {
      id: domainEntity.id as number,
      userId: props.userId,
      action: props.action,
      amount: props.amount,
      ts: props.ts,
    };
  }
}
