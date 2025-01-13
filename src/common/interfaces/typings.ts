// import { Includeable, Transaction } from 'sequelize';
// import { User } from 'src/user/interfaces/user.interface';

// // export interface FindMany {
// //   search?: string[];
// //   sort?: string[];
// //   include?: Includeable[]; //
// //   offset?: number;
// //   limit?: number;
// //   page?: number;
// //   lean?: boolean;
// //   attributes?: string[];
// // }

// export interface FindOne extends Pick<FindMany, 'include' | 'attributes'> {
//   id?: string;
//   lean?: boolean;
//   transaction?: Transaction;
//   increaseView?: boolean;
// }

// export interface AuthUser
//   extends Omit<
//     User,
//     'password' | 'otp_code' | 'otp_code_used' | 'otp_exp_time'
//   > {}
