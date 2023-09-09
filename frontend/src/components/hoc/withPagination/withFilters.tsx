import React from 'react';
import { NextRouter } from 'next/router';

import { useAppSelector } from '@/hooks/useRedux';

export interface PaginationProps {
  page: number;
  pageSize: number;
}

export function withPagination<P>(WrappedComponent: React.ComponentType<P>) {
  const WithPagination = (props: P & NextRouter) => {
    const { params } = useAppSelector((store) => store.filters);

    const page = params.page
      ? isNaN(parseInt(params.page))
        ? 1
        : parseInt(params.page)
      : 1;
    const pageSize = params.pageSize
      ? isNaN(parseInt(params.pageSize))
        ? 1
        : parseInt(params.pageSize)
      : 1;

    return (
      <>
        <WrappedComponent {...props} page={page} pageSize={pageSize} />
      </>
    );
  };

  return WithPagination;
}
