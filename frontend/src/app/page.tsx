'use client';
import Spinner from '@/components/atoms/Spinner';
import Header from '@/components/molecules/Header';
import HomeBackground from '@/components/molecules/HomeBackground';
import PaginationContainer from '@/components/molecules/Pagination';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import { useQuery } from '@/hooks/useQuery';
import { PropertyZ } from '@/models/property';
import { API_ROUTES } from '@/utils/constants';
import { Center, Text } from '@mantine/core';

export default function Home() {
  const { data, loading, meta } = useQuery<PropertyZ[]>({
    url: `${API_ROUTES.PROPERTY.BASE}`,
    pageSize: 3
  });

  return (
    <main>
      <Header header="Real Estate" />
      <HomeBackground />
      <div className="w-full">
        {loading ? (
          <Spinner size={32} />
        ) : (
          <>
            {data?.length ? (
              <>
                <PropertyGrid properties={data || []} />
                <div className="w-[500px] mx-auto bg-gray-100 py-[10px] flex">
                  {meta?.total && (
                    <div className="my-auto mx-[20px] w-[200px] poppins">
                      Total {meta?.total} Items
                    </div>
                  )}
                  <PaginationContainer total={meta?.totalPages || 0} />
                </div>
              </>
            ) : (
              <Center className="mt-[20px]">No Results Found</Center>
            )}
          </>
        )}
      </div>
    </main>
  );
}
