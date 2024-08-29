import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EmailParamsDto } from './dto';
import { OtpEmailParamsDto } from './dto/otp-email-params.dto';
import { readFileSync } from 'fs';
import { envs } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { EmailResponse } from './interfaces';

@Injectable()
export class EmailService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(EmailService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database \\(^.^)/');
  }

  constructor(private readonly mailer: MailerService) {
    super();
  }

  async sendEmail(emailParams: EmailParamsDto) {
    const { to, subject, text } = emailParams;

    const resp = (await this.mailer.sendMail({ from: envs.emailFrom, to, subject, text })) as EmailResponse;

    this.logger.log(`Email sent to ${to}`);

    await this.email.create({
      data: {
        to,
        subject,
        text,
        from: envs.emailFrom,
        messageId: resp?.messageId,
      },
    });
  }

  async sendOtpEmail(emailParams: OtpEmailParamsDto) {
    try {
      const { otp, to, username } = emailParams;
      const from = envs.emailFrom;
      const template = readFileSync('./src/email/templates/otp-template.html', 'utf8');
      const html = template.replace(/{{otp}}/g, otp).replace(/{{username}}/g, username);
      // const resp = (await this.mailer.sendMail({ from, to, subject: `Your OTP [${otp}]`, html })) as EmailResponse;

      this.logger.log(`Email sent to ${to} with OTP: ${otp}`);
      await this.email.create({
        data: {
          to,
          subject: `Your OTP [${otp}]`,
          text: html,
          from,
          // messageId: resp?.messageId,
        },
      });

      return { message: 'Email sent', ok: true };
    } catch (error) {
      this.logger.error('🚀 ~ EmailService ~ sendOtpEmail ~ error:', error);

      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to send OTP email',
      });
    }
  }
}
