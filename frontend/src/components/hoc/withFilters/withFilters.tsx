import React from 'react';
import { NextRouter } from 'next/router';

import { Query } from '@/containers/FilterPanel';
import { useAppSelector } from '@/hooks/useRedux';

export interface FilterProps {
  url: string;
  query: Query;
}

export function withFilters<P>(WrappedComponent: React.ComponentType<P>) {
  const WithFilters = (props: P & NextRouter) => {
    const { params, url } = useAppSelector((store) => store.filters);

    return (
      <>
        <WrappedComponent {...props} url={url} query={params} />
      </>
    );
  };

  return WithFilters;
}
