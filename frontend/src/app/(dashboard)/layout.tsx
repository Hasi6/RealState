'use client';
import { AppShell, Header, Text } from '@mantine/core';
import { compose } from 'lodash/fp';

import { withAuth } from '@/components/hoc/withAuth/withAuth';
import NavbarComponent from '@/components/molecules/Navbar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={<NavbarComponent />}
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <Text>Real Estate</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default compose(withAuth)(DashboardLayout);
