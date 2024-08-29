import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailParamsDto } from './dto';
import { OtpEmailParamsDto } from './dto/otp-email-params.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('email.send')
  async sendEmail(@Payload() emailParams: EmailParamsDto) {
    return this.emailService.sendEmail(emailParams);
  }

  @MessagePattern('email.send.otp')
  async sendOtpEmail(@Payload() otpParams: OtpEmailParamsDto) {
    return this.emailService.sendOtpEmail(otpParams);
  }
}
