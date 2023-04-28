import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.interface';
import { UserEntity } from '@entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly Users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUser);
    await this.userRepository.save(newUser);
    return await this.userRepository.findOne({ where: { username } });
  }

  findAll(): User[] {
    return this.Users;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.Users.find((user) => user.username === username);
  }
}
