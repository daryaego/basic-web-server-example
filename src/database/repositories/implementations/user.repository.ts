import { UserEntity } from '~/domain/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { USER_MAPPER } from '~/base/keys';
import { UserMapper } from '~/mappers/user.mapper';
import { UserDatabaseEntity } from '~/database/entities';

export class UserRepository implements IUserRepository {
  @Inject(USER_MAPPER)
  private readonly userMapper: UserMapper;

  async getById(id: number): Promise<UserEntity> {
    const user = await UserDatabaseEntity.findOne({
      where: { id },
      relations: {
        balanceActions: true,
      },
    });
    if (!user) throw new NotFoundException(`User not found ${id}`);
    return this.userMapper.toDomain(user);
  }

  async save(user: UserEntity): Promise<void> {
    const dbEntity = this.userMapper.toDatabase(user);
    await UserDatabaseEntity.save(dbEntity);
  }
}
