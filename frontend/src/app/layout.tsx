'use client';
import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { Providers } from '@/store/Provider';
import { getQueryParams } from '@/utils/queryParams';
import { useAppDispatch } from '@/hooks/useRedux';
import { setFilters } from '@/store/slices/filters';
import { checkUser } from '@/store/slices/user';

import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Real Estate</title>
      </head>
      <Providers>
        <body className="w-full">
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light'
            }}
          >
            <Notifications />
            <Layout>{children}</Layout>
          </MantineProvider>
        </body>
      </Providers>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
    initFilters();
  }, []);

  const initFilters = () => {
    const { url, params } = getQueryParams();

    dispatch(
      setFilters({
        url,
        params
      })
    );
  };

  return <>{children}</>;
}
