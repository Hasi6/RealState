'use client';
import queryString from 'query-string';

import { Query } from '@/containers/FilterPanel';

export function getQueryParams() {
  if (typeof window === 'undefined') {
    return { url: '', params: {} };
  }

  const params = queryString.parse(window.location.search) as Query;
  let url = '';
  for (let key in params) {
    url += key + '=' + encodeURIComponent(params[key]) + '&';
  }

  return {
    url: url.slice(0, -1),
    params
  };
}
