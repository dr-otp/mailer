import { IsNotEmpty, MinLength } from 'class-validator';

export class OtpEmailParamsDto {
  @IsNotEmpty()
  @MinLength(1)
  to: string;

  @IsNotEmpty()
  @MinLength(1)
  otp: string;

  @IsNotEmpty()
  @MinLength(1)
  username: string;
}
