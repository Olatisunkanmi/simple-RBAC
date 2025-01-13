type AppApiTag = {
  [key: string]: {
    path: string;
    description: string;
  };
};

export enum ApiTag {
  AUTH = 'Auth',
  OTP = 'OTPs',
  USER = 'Users',
  SHARED = 'Shared',
  POST = 'Posts',
  ADMIN = 'Admin',
  IMAGE = 'Images',
  EXAM = 'Exams',
  COURSES = 'Courses',
  DEPARTMENTS = 'Departments',
  EXAMBODY = 'ExamBody',
  ROLE = 'Roles',
  SUBSCRIPTIONS = 'subscriptions',
}

export const AppApiTags: AppApiTag = {
  [ApiTag.AUTH]: { path: 'auth', description: 'All things authentication' },
  [ApiTag.USER]: { path: 'users', description: 'All things users' },
  [ApiTag.SHARED]: { path: 'shared', description: 'All shared services' },
  [ApiTag.POST]: { path: 'posts', description: 'All posts services' },
  [ApiTag.ADMIN]: { path: 'admin', description: 'All things Admins' },
  [ApiTag.IMAGE]: { path: 'images', description: 'All things Images' },
  [ApiTag.EXAM]: { path: 'exams', description: 'All things Exams/Test' },
  [ApiTag.COURSES]: { path: 'courses', description: 'All things Courses' },
  [ApiTag.DEPARTMENTS]: {
    path: 'departments',
    description: 'All things Departments',
  },
  [ApiTag.EXAMBODY]: { path: 'ExamBody', description: 'All things ExamBody' },
  [ApiTag.ROLE]: { path: 'roles', description: 'All things Roles' },
  [ApiTag.SUBSCRIPTIONS]: {
    path: 'subscriptions',
    description: 'All things subscriptions',
  },
};
