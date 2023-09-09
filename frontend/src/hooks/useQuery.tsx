import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';

import http from '@/services/http';
import { useAppSelector } from './useRedux';

export interface Meta {
  totalPages: number;
  total: number;
}

interface IProps {
  url: string;
  notFetchOnLoad?: boolean;
  customHeaders?: object;
  page?: number;
  pageSize?: number;
}

function useQuery<Resource>({
  url,
  notFetchOnLoad,
  customHeaders = {},
  page,
  pageSize
}: IProps) {
  const { url: filters } = useAppSelector((store) => store.filters);
  const [data, setData] = useState<Resource | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (!notFetchOnLoad) {
      fetchData();
    }
  }, [url, page, pageSize, filters]);

  const fetchData = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    const headers = {
      headers: {
        ...customHeaders
      }
    };
    try {
      const finalUrl = filters ? `${url}?${filters}` : url;
      const response = await http.get(`${finalUrl}`, headers);
      setLoading(false);
      setData(response?.data?.data);
      if (response.data?.meta) {
        setMeta({
          total: response.data?.meta?.total,
          totalPages: response.data?.meta?.totalPages
        });
      } else {
        setMeta({
          total: 0,
          totalPages: 0
        });
      }
      return {
        success: true,
        data: response?.data,
        errors: null
      };
    } catch (err: any) {
      setLoading(false);
      setError(err);
      setMeta({
        total: 0,
        totalPages: 0
      });
      if (err?.status === 403) {
        notifications.show({
          title: 'Unauthorized',
          message: "Don't have permissions",
          color: 'red'
        });
      }
      return {
        success: false,
        data: null,
        errors: err
      };
    }
  };

  return { error, loading, data, retry: fetchData, meta };
}

export { useQuery };
