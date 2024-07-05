import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'A senha precisa ter no minimo 8 caracteres',
  })
  @MaxLength(16, {
    message: 'A senha precisa ter no maximo 16 caracteres',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula e um caractere especial',
  })
  password: string;
}
