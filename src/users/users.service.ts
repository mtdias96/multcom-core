import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const emailTaken = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new ConflictException('O email já está sendo usado');
    }

    const user = await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return user;
  }
}
