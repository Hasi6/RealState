export enum HTTP_TYPES {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
  'PATCH' = 'patch'
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export enum ROUTES {
  DASHBOARD = '/dashboard',
  HOME = '/',
  LOGIN = '/login'
}

export const API_ROUTES = {
  AUTH: {
    CURRENT_USER: '/auth/current-user',
    LOGIN: '/auth/login'
  },
  PROPERTY: {
    BASE: '/property'
  }
};

export const MESSAGES = {
  SOME_THING_WENT_WRONG: 'Something went wrong. Please try again.',
  OPERATION_SUCCESS: 'Operation Success'
};
