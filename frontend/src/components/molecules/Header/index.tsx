import ButtonContainer from '@/components/atoms/Button';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  header: React.ReactNode;
}

const Header: FC<Props> = ({ header }) => {
  return (
    <div className='flex justify-between mx-[100px]'>
      <div>{header}</div>
      <div>
        <Link href={ROUTES.HOME}>Home</Link>
        <Link href={ROUTES.DASHBOARD}>
          <ButtonContainer>Add Property</ButtonContainer>
        </Link>
      </div>
    </div>
  );
};

export default Header;
