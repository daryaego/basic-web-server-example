import { UserEntity } from '~/domain/user.entity';

export interface IUserRepository {
  getById(id: number): Promise<UserEntity>;
  save(user: UserEntity): Promise<void>;
}
