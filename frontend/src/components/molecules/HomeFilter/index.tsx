import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import queryString from 'query-string';

import SelectContainer from '@/components/molecules/Select';
import {
  PropertyLocation,
  PropertyStatus,
  PropertyType
} from '@/models/property';
import { useAppDispatch } from '@/hooks/useRedux';
import ButtonContainer from '@/components/atoms/Button';
import { setFilters } from '@/store/slices/filters';
import { Query } from '@/containers/FilterPanel';

interface Params {
  [key: string]: string;
}

function HomeFilter() {
  const [params, setParams] = useState<Params>({});

  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const advancedSearch: Query = {};

    for (const key of Object.keys(params)) {
      if (params[key]) {
        advancedSearch[key] = params[key];
      }
    }

    const query = queryString.stringify(advancedSearch);
    dispatch(
      setFilters({
        url: query,
        params
      })
    );
  };

  return (
    <div className="bg-white flex py-[20px] pl-[10px] pr-[25px]">
      <SelectContainer
        onChange={(value) => setParams({ ...params, location: value })}
        placeHolder="All Main Locations"
        data={[
          PropertyLocation.Colombo,
          PropertyLocation.Galle,
          PropertyLocation.Kandy
        ].map((location) => ({
          label: location,
          value: location
        }))}
        id="location"
      />
      <SelectContainer
        onChange={(value) => setParams({ ...params, status: value })}
        placeHolder="All Status"
        data={[PropertyStatus.Rent, PropertyStatus.Sale].map((status) => ({
          label: status,
          value: status
        }))}
        id="location"
      />
      <SelectContainer
        onChange={(value) => setParams({ ...params, type: value })}
        placeHolder="All Types"
        data={[PropertyType.SingleFamily, PropertyType.Villa].map((type) => ({
          label: type,
          value: type
        }))}
        id="location"
      />
      <ButtonContainer className="flex" onClick={handleSearch}>
        <BsSearch className="mr-[10px]" />
        <p>Search</p>
      </ButtonContainer>
    </div>
  );
}

export default HomeFilter;
