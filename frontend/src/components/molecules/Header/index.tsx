import ButtonContainer from '@/components/atoms/Button';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  header: React.ReactNode;
}

const Header: FC<Props> = ({ header }) => {
  return (
    <div className="flex justify-between mx-[100px] py-[10px]">
      <div className="text-2xl">{header}</div>
      <div>
        <Link className="mx-[10px] font-bold" href={ROUTES.HOME}>
          Home
        </Link>
        <Link href={ROUTES.DASHBOARD} className="mx-[10px] font-bold">
          <ButtonContainer>Add Property</ButtonContainer>
        </Link>
      </div>
    </div>
  );
};

export default Header;
