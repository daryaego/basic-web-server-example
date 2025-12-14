export abstract class Mapper<DtoEntity, DomainEntity, DatabaseEntity> {
  abstract toDomain(DatabaseEntity): DomainEntity;
  abstract toDatabase(DomainEntity): DatabaseEntity;
  abstract toDto(DomainEntity): DtoEntity;
}
