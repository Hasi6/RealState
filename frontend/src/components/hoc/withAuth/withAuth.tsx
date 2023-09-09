import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextRouter } from 'next/router';

import { useAppSelector } from '@/hooks/useRedux';
import Spinner from '@/components/atoms/Spinner';
import { ROUTES } from '@/utils/constants';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  const VisibityControlled = (props: P & NextRouter) => {
    const naviagate = useRouter();
    const { authenticated, loading, user } = useAppSelector(
      (store) => store.user
    );
    const [permission, setPermission] = useState(false);

    useEffect(() => {
      checkPermission();
    }, [authenticated, loading]);

    const checkPermission = () => {
      if (loading) {
        return;
      }

      if (authenticated === false) {
        naviagate.push(ROUTES.LOGIN);
        return;
      }
      if (authenticated === true && user) {
        return setPermission(true);
      }
    };

    return (
      <>
        {!loading && permission ? (
          <WrappedComponent {...props} />
        ) : (
          <div className="h-screen flex">
            <div className="m-auto">
              <Spinner size={30} />
            </div>
          </div>
        )}
      </>
    );
  };

  return VisibityControlled;
}
