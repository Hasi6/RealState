import { Navbar, Text } from '@mantine/core';
import Link from 'next/link';
import { LuLayoutDashboard } from 'react-icons/lu';

import { ROUTES } from '@/utils/constants';

function NavbarComponent() {
  return (
    <Navbar p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
      <Link href={ROUTES.DASHBOARD}>
        <div className='flex'>
          <LuLayoutDashboard className='my-auto mr-[10px]' />
          <Text className='my-auto'>Locations</Text>
        </div>
      </Link>
    </Navbar>
  );
}

export default NavbarComponent;
