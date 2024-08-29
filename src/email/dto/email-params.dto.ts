import { IsNotEmpty, MinLength } from 'class-validator';

export class EmailParamsDto {
  @IsNotEmpty()
  @MinLength(1)
  to: string;

  @IsNotEmpty()
  @MinLength(1)
  subject: string;

  @IsNotEmpty()
  @MinLength(1)
  text: string;
}
