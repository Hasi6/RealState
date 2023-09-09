'use client';
import React from 'react';
import { compose } from 'lodash/fp';

import FromContainer from '@/containers/Form';
import { ACCESS_TOKEN, API_ROUTES, HTTP_TYPES } from '@/utils/constants';
import { UserLoginPayloadZ, userCreateSchema } from '@/models/user';
import { withUnAuth } from '@/components/hoc/withUnauth/withUnauth';

const LoginPage = () => {
  const generateUISchema = (): FromContainer.UISchema[] => {
    return [
      {
        field: 'input',
        id: 'email',
        helperText: 'Email',
        label: 'Email',
        placeHolder: 'Email',
        type: 'email'
      },
      {
        field: 'input',
        type: 'password',
        id: 'password',
        helperText: 'Password',
        label: 'Password',
        placeHolder: 'Password'
      }
    ];
  };

  const handleSuccess = (payload: UserLoginPayloadZ) => {
    localStorage.setItem(ACCESS_TOKEN, payload?.access_token);
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="min-w-[400px]">
          <FromContainer<UserLoginPayloadZ>
            initialValues={{
              email: '',
              password: ''
            }}
            method={HTTP_TYPES.POST}
            onSuccess={handleSuccess}
            schema={userCreateSchema}
            submitButtonName="Login"
            uiSchema={generateUISchema()}
            url={API_ROUTES.AUTH.LOGIN}
          />
        </div>
      </div>
    </div>
  );
};

export default compose(withUnAuth)(LoginPage);
