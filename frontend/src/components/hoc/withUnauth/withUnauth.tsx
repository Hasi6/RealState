import React, { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks/useRedux';
import { ROUTES } from '@/utils/constants';
import { NextRouter } from 'next/router';
import { useRouter } from 'next/navigation';

export function withUnAuth<P>(WrappedComponent: React.ComponentType<P>) {
  const VisibityControlled = (props: P & NextRouter) => {
    const navigate = useRouter();
    const { authenticated, loading } = useAppSelector((store) => store.user);
    const [permission, setPermission] = useState(false);

    useEffect(() => {
      checkPermission();
    }, [authenticated, loading]);

    const checkPermission = () => {
      if (loading) {
        return;
      }

      if (authenticated === true) {
        navigate.push(ROUTES.HOME);
        return;
      }
      if (authenticated === false) {
        setPermission(true);
      }
    };

    return (
      <>
        {permission ? (
          <WrappedComponent {...props} />
        ) : (
          <div className='h-screen flex'>
            <div className='m-auto'>Loading</div>
          </div>
        )}
      </>
    );
  };

  return VisibityControlled;
}
