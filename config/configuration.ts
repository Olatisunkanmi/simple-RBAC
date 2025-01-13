import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  validateSync,
  ValidationError,
} from 'class-validator';

// Supported environments
enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Error = 'error',
  Verbose = 'verbose',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  APP_NAME: string;

  @IsString()
  APP_PORT: string;

  @IsString()
  @IsOptional()
  APP_VERSION: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

/**
 * @function validate
 *
 * Validates the format of the environment variables defined in the
 * .env.${NODE_ENV} files. Throws an exception to stop the app from
 * running if their is an invalid configuration variable.
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages: string[] = [];
    errors.forEach((error) => {
      if (error instanceof ValidationError) {
        const message = `Abort startup w/ invalid configuration: ${error.property} equals ${error.value} is invalid`;
        messages.push(message);
      }
    });
    throw new Error(messages[0]);
  }
  return validatedConfig;
}

/**
 * @function configuration
 *
 * Converts the app environment variables to a configuration object that
 * can be accessed in the app.
 */

export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV || Environment.Staging,
  appName: process.env.APP_NAME || 'Excel-AI Backend',
  appDesc: process.env.APP_DESC || 'Excel-AI Backend',
  LogLevel: process.env.LOG_LEVEL || LogLevel.Debug,
  appRoot: process.cwd(),
  port: parseInt(process.env.APP_PORT, 10) || 3002,
  hostname: process.env.APP_HOSTNAME || '0.0.0.0',
  version: process.env.APP_VERSION || 'v1',
  website: process.env.WEB_URL || 'v1',
  devMail: process.env.DEV_MAIL || '',
  
  host:
    process.env.APP_HOST || `http://localhost:${process.env.APP_PORT || 3456}`,
  app:
    process.env.APP_URL || `http://localhost:${process.env.APP_PORT || 3000}`,
  apiPrefix: process.env.API_PREFIX || 'api',

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },

  cloudinary: {
    name: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
  },

  Queue: {
    url: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    user: process.env.REDIS_USERNAME,
    pass: process.env.REDIS_PASS,
    db: process.env.REDIS_DB || 'excel-ai',
  },

  imageServiceConfig: {
    url: process.env.IMAGE_SERVICE_URL,
  },
});
