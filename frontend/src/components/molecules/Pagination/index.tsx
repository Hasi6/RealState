import { Pagination } from '@mantine/core';
import { FC } from 'react';
import queryString from 'query-string';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getQueryParams } from '@/utils/queryParams';
import { Query } from '@/containers/FilterPanel';
import { setFilters } from '@/store/slices/filters';

interface Props {
  total: number;
}

const PaginationContainer: FC<Props> = ({ total }) => {
  const dispatch = useAppDispatch();
  const { params: filterParams } = useAppSelector((store) => store.filters);

  const currentPage = filterParams.page ? +filterParams.page : 1;

  const { params } = getQueryParams();

  const handleChangePage = (page: number) => {
    const simpleSearch: Query = { ...params };
    simpleSearch['page'] = String(page);
    const query = queryString.stringify(simpleSearch);

    window.history.pushState(null, '', `?${query}`);
    dispatch(
      setFilters({
        url: query,
        params: simpleSearch,
      })
    );
  };

  return (
    <Pagination
      className='w-[400px] mx-auto my-[10px]'
      value={currentPage}
      onChange={handleChangePage}
      total={total}
    />
  );
};

export default PaginationContainer;
