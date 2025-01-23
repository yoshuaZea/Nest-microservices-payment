import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  APP_PORT: number;
  STRIPE_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_ENDPOINT_SECRET: string;
}

const evnsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.APP_PORT,
  stripeSecret: envVars.STRIPE_SECRET,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
};
