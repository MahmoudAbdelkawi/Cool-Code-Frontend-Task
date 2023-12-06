import { IsNotEmpty, Length, IsEmail, Matches } from 'class-validator';

// export class SignupDto {
//   @IsNotEmpty()
//   @Length(8)
//   password: string;
//   @IsEmail()
//   email: string;
// }

export class RegisterationDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}
