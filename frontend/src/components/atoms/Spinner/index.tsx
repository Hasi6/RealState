import { FC } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props {
  size: number;
}

const Spinner: FC<Props> = ({ size }) => {
  return (
    <BiLoaderAlt className="animate-spin mx-auto" style={{ fontSize: size }} />
  );
};

export default Spinner;
