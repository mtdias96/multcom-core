import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { env } from 'src/shared/config/env';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
