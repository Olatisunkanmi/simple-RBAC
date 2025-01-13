import * as dotenv from 'dotenv';
dotenv.config();

import * as moment from 'moment';

export const OTP_CODE_EXP: string = moment().add(45, 'minutes').toString();

export const passwordPattern = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])',
);
export const CONSTANT = {
  LOGIN_SUCCESS: 'Login Successful',
  OTP_SENT: 'An OTP has been sent to you. Please check your email.',
  OAUTH_ACCESS_REQ: 'You need to grant Excel AI access to your account',
  OAUTH_ERROR: (msg) => `Error fetching reaching API, ${msg}`,
  OOPS: `Ooops! Something went wrong, this is not you!`,
  CONFIRM_MAIL_SENT: (mail) =>
    `A confirmation email has been successfully sent to ${mail}. Please check your inbox and click the provided link to complete the process.`,
  RESET_MAIL: (mail) => `A reset email has been sent to ${mail}.`,
  USER_CONFLICT: 'Email has been taken',
  CREDS_TAKEN: 'Credentials taken',
  USERNAME_TAKEN: 'Ouch! Username is Taken',
  INCORRECT_CREDS: 'Incorrect Credentials',
  PASSWORD_SAME: 'Your cannot use your previous password as your new password',
  EMAIL_VERIFIED: 'Your Email Address has been Verified',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid Password',
  PASSWORD_NOT_MATCH: 'Password Do Not Match',
  PASSWORD_CHANGED: 'Password has been changed',
  INVALID_TOKEN: 'Invalid Token',
  INVALID_REFERRAL: 'Invalid Referral Code',
  INVALID_USER: 'Invalid User',
  INVALID_EMAIL: 'Invalid Email',
  INVALID_USERNAME: 'Invalid Username',
  INVALID_PASSWORD_FORMAT:
    'Password must contain at least one uppercase, lowercase, digit and special character',
  OOPs: 'Oops! Something went wrong!',
  ERROR_CREATING_REF_CODE: 'An Error Occured while creating referral code',
  TOKEN_EXP: 'Your session has expired. Please log in again to continue.',
  SIGN_IN_FAILED: 'Sign in failed!',
  MAIL_UNVERIFIED: 'Kndly Verify your Mail before you can proceed',
  LOGIN_URL_SENT:
    'A url has been sent to your mail, Please click the link to login',
  UNAUTHORIZED: 'Unauthorized',
  onUserLogin: 'user.login',
  onUserRegister: 'user.register',
  sendConfirmationMail: 'confirmation.mail.request',
  onUserSpotifyReg: 'user.regiser.spotify',
  onSpotyRegister: 'user.regiser.spotify',
  onYTRegister: 'user.regiser.youtube',
  onEmailConfirmationSend: 'user.confirmation.mail.send',
  onEmailConfirmation: 'user.confirmed.mail',
  onlogin_via_url_req: 'user_req_passwordless_login',
  onImageUpload: 'user.upload.image',
  onProfilePhotoUpload: 'user.upload.profile.photo',
  onPasswordChange: 'user.password.change.success',
  onPasswordReset: 'user.password.reset.success',
  onProfilePhotoUploadSuccess: 'user.upload.profile.photo.success',
  passwordLessLogin: 'user_req_passwordless_login',
  IMAGE_UPLOADED_SUCCESS: (imageType) =>
    `${imageType} has been changed Successfully`,
};

export const SENSITIVE_INFO = ['password'];

export const QUEUE = {
  AuthQ: 'auth-queue',
};

export const MAIL = {
  noreply: 'No Reply noreply@excelai.vastlearn.io',
  waitListSubject: 'Welcome to Excel AI',
  waitListFrom: 'The Swap Crew',
  otpRegister: "Excel AI: Here's the secure OTP",
  passwordReset: 'Excel AI: Password  Reset',
  confirmEmail: 'Excel AI: Email Verification',
  welcomeMail: 'Excel AI: Welcome Onboard',
  passswordChange:
    'Excel AI Security: Your Password has been changed successfully',
};

export const YtAPI = {
  ACCESS_TOKEN: 'https://oauth2.googleapis.com/token',
};

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export const YT_SCOPES = {
  EMAIL: 'https://www.googleapis.com/auth/userinfo.email',
  PROFILE: 'https://www.googleapis.com/auth/userinfo.profile',
};

export const EXCLUDED_RESPONSE_INTERCEPTOR = [''];

export const EX_API_URL = {
  FETCH_COUNTRIES: 'https://countriesnow.space/api/v0.1',
};
