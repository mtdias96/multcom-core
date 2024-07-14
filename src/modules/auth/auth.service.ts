import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(signupDto: SignupDto) {
    const { email, name, password } = signupDto;

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
  async authenticate(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const acessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    console.log(acessToken);

    return {
      acessToken,
    };
  }
}
