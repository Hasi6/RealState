'use client';
import { Button, Select } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import queryString from 'query-string';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from '@/hooks/useRedux';
import { clearFilters, setFilters } from '@/store/slices/filters';
import { getQueryParams } from '@/utils/queryParams';
import InputContainer from '@/components/molecules/Input';

export interface Query {
  [name: string]: string;
}

type FilterTypes = 'input' | 'select';

export namespace Filters {
  export interface Filter {
    id: string;
    label: string;
    type: FilterTypes;
    options?: Option[];
  }

  export interface Option {
    label: string;
    value: string;
  }

  export interface AdvacedFilter {
    [name: string]: string;
  }
}

interface Props {
  filters?: Filters.Filter[];
}

const FilterPanel: FC<Props> = ({ filters }) => {
  const dispatch = useAppDispatch();
  const { params, url } = getQueryParams();

  const [nonce, setNonce] = useState(uuid);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [search, setSearch] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState<Filters.AdvacedFilter>(
    {}
  );

  useEffect(() => {
    if (!isAdvanced) {
      setSearch((params?.['search'] as string) || '');
    }

    if (!params?.['search'] && Object.keys(params).length) {
      setIsAdvanced(true);
      setAdvancedFilters(params);
    }

    dispatch(
      setFilters({
        params,
        url
      })
    );

    return () => {
      dispatch(clearFilters());
    };
  }, []);

  const handleSimpleSearch = () => {
    if (!search) {
      handleClearParams();
      return;
    }

    const simpleSearch: Query = { ...params };
    simpleSearch['search'] = search;
    const query = queryString.stringify(simpleSearch);
    window.history.pushState(null, '', `?${query}`);
    dispatch(
      setFilters({
        url: query,
        params: simpleSearch
      })
    );
  };

  const handleAdvancedSearch = () => {
    const advancedSearch: Query = {};

    for (const key of Object.keys(advancedFilters)) {
      if (advancedFilters[key]) {
        advancedSearch[key] = advancedFilters[key];
      }
    }
    const query = queryString.stringify(advancedSearch);
    window.history.pushState(null, '', `?${query}`);

    dispatch(
      setFilters({
        url: query,
        params: advancedFilters
      })
    );
  };

  const handleClearParams = () => {
    window.history.pushState(null, '', window.location.pathname);
    setSearch('');
    setAdvancedFilters({});
    setNonce(uuid());
    dispatch(clearFilters());
  };

  const renderFilter = (filter: Filters.Filter) => {
    switch (filter.type) {
      case 'input':
        return (
          <InputContainer
            className="px-0 !py-0 my-0 bg-transparent w-[200px]"
            id={filter.id}
            key={filter.id}
            label={filter.label}
            onChange={(e) =>
              setAdvancedFilters({
                ...advancedFilters,
                [filter.id]: e
              })
            }
            value={advancedFilters[filter.id]}
          />
        );
      case 'select':
        return (
          <Select
            className="mx-[17px] w-[200px]"
            data={filter.options || []}
            key={filter.id}
            label={filter.label}
            onChange={(e) =>
              setAdvancedFilters({
                ...advancedFilters,
                [filter.id]: String(e)
              })
            }
            value={advancedFilters[filter.id]}
          />
        );
      default:
        return (
          <InputContainer
            className="p-0"
            id={filter.id}
            key={filter.id}
            label={filter.label}
            onChange={(e) =>
              setAdvancedFilters({
                ...advancedFilters,
                [filter.id]: e
              })
            }
            value={advancedFilters[filter.id]}
          />
        );
    }
  };

  const canSearch = () => {
    if (search) {
      return true;
    }

    if (Object.values(advancedFilters).some((value) => value)) {
      return true;
    }

    return false;
  };

  const toggleFilters = () => {
    setIsAdvanced(!isAdvanced);
    handleClearParams();
  };

  return (
    <div className="flex" key={nonce}>
      <div className="">
        {isAdvanced && filters?.length ? (
          <div className="grid grid-cols-4 gap-1 w-full">
            {filters.map(renderFilter)}
          </div>
        ) : (
          <InputContainer
            className="px-0 !py-0 my-0 bg-transparent !w-[200px]"
            id="search"
            label="Search"
            onChange={(e) => setSearch(e)}
            value={search}
          />
        )}

        <div className="mx-[10px] mt-[20px]">
          <Button
            onClick={
              isAdvanced && filters?.length
                ? handleAdvancedSearch
                : handleSimpleSearch
            }
            className="bg-blue-500 h-[38px] mx-[5px] disabled:cursor-not-allowed"
            disabled={!canSearch()}
          >
            Search
          </Button>
          {filters && (
            <Button
              onClick={toggleFilters}
              className="bg-blue-500 h-[38px] mx-[5px] disabled:cursor-not-allowed"
            >
              {isAdvanced && filters?.length
                ? 'Simple Filters'
                : 'Advanced Filters'}
            </Button>
          )}
          {Object.keys(params).length > 0 && (
            <Button
              onClick={handleClearParams}
              className="bg-orange-500 hover:bg-orange-600 h-[38px] mx-[5px] disabled:cursor-not-allowed"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
