import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const emailTaken = await this.usersRepository.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new ConflictException('O email já está sendo usado');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
