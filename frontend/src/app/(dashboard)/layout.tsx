'use client';
import { AppShell, Header } from '@mantine/core';
import { compose } from 'lodash/fp';
import Link from 'next/link';

import { withAuth } from '@/components/hoc/withAuth/withAuth';
import NavbarComponent from '@/components/molecules/Navbar';
import { ROUTES } from '@/utils/constants';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarComponent />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <Link href={ROUTES.HOME}>Real Estate</Link>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default compose(withAuth)(DashboardLayout);
