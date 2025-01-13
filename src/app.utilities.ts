import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
// import { IGenerateRefCode } from './token/interface/token.interface';
import * as dayjs from 'dayjs';

@Injectable()
export class AppUtilities {
  public static exp1hr() {
    const date = Date.now() + 3600 * 1000;
    return date.toLocaleString();
  }

  public static isTokenValid(token: {
    expiresIn: string;
    createdAt: Date;
    isUsed: boolean;
  }): boolean {
    console.log(token);
    const createdTimestamp = token.createdAt.getTime();
    const expirationDuration = parseInt(token.expiresIn.replace(/,/g, ''), 10);

    const currentTime = Date.now();
    const tokenExpiration = createdTimestamp + expirationDuration;

    return (
      !token.isUsed &&
      currentTime <= tokenExpiration &&
      currentTime <= createdTimestamp + 3600000
    );
  }

  // protected static generateRefCode(dto: IGenerateRefCode): string {
  //   const { length } = dto;
  //   const numberSet = '0123456789';
  //   const alphanumericSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  //   const characters = dto.type === 'number' ? numberSet : alphanumericSet;

  //   return Array.from(
  //     { length },
  //     () => characters[Math.floor(Math.random() * characters.length)],
  //   ).join('');
  // }

  // public static generateShortCode(charLen = 6): string {
  //   const refCode = this.generateRefCode({ length: 8, type: 'number' });

  //   return refCode;
  // }

  public static getTime() {
    const currentTime = new Date();
    return currentTime.getTime();
  }

  public static readFile(filePath: string) {
    return fs.readFileSync(filePath, 'utf8');
  }

  public static generateToken(len?: number): string {
    return crypto.randomBytes(len || 32).toString('hex');
  }

  public static generateWalletAdd(len?: number): string {
    return this.generateToken(len).toUpperCase();
  }

  public static async validatePassword(
    Incomingpassword: string,
    userPassword: string,
  ) {
    return await bcrypt.compare(Incomingpassword, userPassword);
  }

  public static hashToken(token: string, userId?: string): string {
    return crypto
      .createHash('sha256')
      .update(token + (userId || ''))
      .digest('hex');
  }

  public static async hashPassword(data: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(data, 10);
      return hashedPassword;
    } catch (error) {
      throw new Error('Oops! Something went wrong!');
    }
  }

  public static requestErrorHandler = (response: any = {}) => {
    const {
      message: errorMessage,
      response: serverResp,
      isCancel,
      isNetwork,
      config,
    } = response;

    let message = errorMessage,
      data: any = {},
      isServerError = false;

    if (serverResp?.data) {
      isServerError = true;
      message =
        serverResp.data?.error ||
        serverResp.data?.message ||
        'Unexpected error occurred!';
      data =
        typeof serverResp.data === 'object'
          ? { ...serverResp.data }
          : { data: serverResp.data };
      delete data.message;
    } else if (isCancel) {
      message = 'Request timed out.';
    } else if (isNetwork) {
      message = 'Network not available!';
    }

    const errorData = {
      message,
      isServerError,
      ...(isServerError && {
        data: {
          ...data,
          errorMessage,
          api: {
            method: config?.method,
            url: config?.url,
            baseURL: config?.baseURL,
          },
        },
      }),
    };

    return errorData;
  };

  public static handleException(error: any): Error {
    const errorCode: string = error.code;
    const message: string = error.meta
      ? error.meta.cause
        ? error.meta.cause
        : error.meta.field_name
        ? error.meta.field_name
        : error.meta.column
        ? error.meta.table
        : error.meta.table
      : error.message;
    switch (errorCode) {
      case 'P0000':
      case 'P2003':
      case 'P2004':
      case 'P2015':
      case 'P2018':
      case 'P2025':
        return new NotFoundException(message);
      case 'P2005':
      case 'P2006':
      case 'P2007':
      case 'P2008':
      case 'P2009':
      case 'P2010':
      case 'P2011':
      case 'P2012':
      case 'P2013':
      case 'P2014':
      case 'P2016':
      case 'P2017':
      case 'P2019':
      case 'P2020':
      case 'P2021':
      case 'P2022':
      case 'P2023':
        return new BadRequestException('Invalid ID');
      case 'P2026':
      case 'P2027':
        return new BadRequestException(message);
      case 'P2024':
        return new RequestTimeoutException(message);
      case 'P0001':
        return new UnauthorizedException(message);
      case 'P2002':
        const msg = `Conflict Exception: '${error.meta?.target?.[0]}' already exists!`;
        return new ConflictException(error.meta?.target?.[0] ? msg : message);
      default:
        console.error(message);
        if (!!message && message.toLocaleLowerCase().includes('arg')) {
          return new BadRequestException(
            'Invalid/Unknown field was found in the data set!',
          );
        } else {
          return error;
        }
    }
  }

  public static encode(
    data: string,
    encoding: BufferEncoding = 'base64',
  ): string {
    return Buffer.from(data).toString(encoding);
  }

  public static decode(
    data: string,
    encoding: BufferEncoding = 'base64',
  ): string {
    return Buffer.from(data, encoding).toString();
  }

  public static genUuid() {
    return v4();
  }

  public static removeSensitiveData(data: any, deleteKeys: any, remove = true) {
    if (typeof data != 'object') return data;

    for (const key in data) {
      if (deleteKeys.includes(key)) {
        remove ? delete data[key] : (data[key] = '******************');
      } else {
        AppUtilities.removeSensitiveData(data[key], deleteKeys); // recursive to check inner object
      }
    }
    return data;
  }

  private static getDurationInWeeks(duration: string): number {
    switch (duration) {
      case 'TRIAL':
        return 2;
      case 'MONTHLY':
        return 4;
      case 'QUARTERLY':
        return 13;
      case 'BI_ANNUAL':
        return 26;
      case 'ANNUAL':
        return 52;
      default:
        throw new Error('Invalid duration');
    }
  }

  public static getSubscriptionDuration(duration: string) {
    const getDuration = this.getDurationInWeeks(duration);
    return dayjs().add(getDuration, 'week').toDate();
  }

  public static getCurrentDate() {
    return dayjs().format();
  }

  public static getRolloverDate(endDate: Date) {
    return dayjs(endDate).add(1, 'month').toDate();
  }

  public static findSubscriptionDiscount(discount: number, price: number) {
    const discountedRate = (discount / 100) * price;
    return price - discountedRate;
  }
}
