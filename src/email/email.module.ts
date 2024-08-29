import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { envs } from 'src/config';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: envs.emailHost,
        auth: {
          user: envs.emailUsername,
          pass: envs.emailPassword,
        },
      },
    }),
  ],
  exports: [MailerModule, EmailService],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
