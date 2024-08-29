import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  STATE: string;
  NATS_SERVERS: string[];
  EMAIL_FROM: string;
  EMAIL_HOST: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    STATE: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    EMAIL_FROM: joi.string().required(),
    EMAIL_HOST: joi.string().required(),
    EMAIL_USERNAME: joi.string().required(),
    EMAIL_PASSWORD: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({ ...process.env, NATS_SERVERS: process.env.NATS_SERVERS?.split(',') });

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  state: envVars.STATE,
  natsServers: envVars.NATS_SERVERS,
  emailFrom: envVars.EMAIL_FROM,
  emailHost: envVars.EMAIL_HOST,
  emailUsername: envVars.EMAIL_USERNAME,
  emailPassword: envVars.EMAIL_PASSWORD,
};
