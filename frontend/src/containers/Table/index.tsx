'use client';
import { Checkbox, Loader, Table } from '@mantine/core';
import queryString from 'query-string';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';

import HAuthPagination from '@/components/molecules/Pagination';
import { Meta } from '@/hooks/useQuery';
import { getQueryParams } from '@/utils/queryParams';
import { Query } from '@/containers/FilterPanel';
import { setFilters } from '@/store/slices/filters';
import { useAppDispatch } from '@/hooks/useRedux';

namespace TableContainer {
  export interface Column<TAttributes> {
    id: string;
    label?: string;
    onClick?: Function;
    render?: (attributes: TAttributes) => React.ReactNode;
    renderHeader?: () => React.ReactNode;
    width?: number;
  }
}

interface Props<TAttributes> {
  columns: TableContainer.Column<TAttributes>[];
  data: TAttributes[];
  loading?: boolean;
  selectStatus?: 'full' | 'partial';
  handleSelectAll?: () => void;
  meta: Meta | null;
}

type Sort = '+' | '-';

function TableContainer<TAttributes>({
  columns,
  data,
  loading,
  selectStatus,
  handleSelectAll,
  meta
}: Props<TAttributes>): JSX.Element {
  const dispatch = useAppDispatch();

  const { params } = getQueryParams();

  const handleClickSort = (column: string, sort: Sort) => {
    const sortQuery: Query = { ...params };
    sortQuery['sort'] = `${sort}${column}`;
    const query = queryString.stringify(sortQuery);
    window.history.pushState(null, '', `?${query}`);
    dispatch(
      setFilters({
        url: query,
        params: sortQuery
      })
    );
  };

  const ths = () => {
    return (
      <tr>
        {columns.map((column) => (
          <th key={column.id}>
            {column.id === 'checkbox' ? (
              <>
                <Checkbox
                  checked={selectStatus === 'full'}
                  onChange={() => handleSelectAll && handleSelectAll()}
                />
              </>
            ) : (
              <div className="flex">
                <div className="my-auto">
                  {column.renderHeader ? column.renderHeader() : column.label}
                </div>
              </div>
            )}
          </th>
        ))}
      </tr>
    );
  };

  const rows = () => {
    return (
      <>
        {loading ? (
          <tr>
            <td
              className="w-full mx-auto"
              colSpan={Object.keys(columns).length}
            >
              <Loader className="mt-[20px] h-[200px] mx-auto" />
            </td>
          </tr>
        ) : (
          <>
            {data.length > 0 ? (
              data.map((da, index) => (
                <tr key={index}>
                  {columns.map((column, index) => (
                    <td key={column.id}>
                      {/* @ts-ignore */}
                      {column.render ? column.render(da) : da?.[column.id]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="py-[20px]">
                <td
                  colSpan={columns.length}
                  className="mx-auto text-center my-[20px]"
                >
                  No Results
                </td>
              </tr>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Table className="my-[10px]">
        <thead>{ths()}</thead>
        <tbody>{rows()}</tbody>
      </Table>
      {meta && (
        <div className="mx-auto my-[20px]">
          <HAuthPagination total={meta?.totalPages} />
        </div>
      )}
    </>
  );
}

export default TableContainer;
