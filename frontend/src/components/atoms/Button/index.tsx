import { Button, ButtonProps } from '@mantine/core';
import React from 'react';
type BP = import('@mantine/utils').PolymorphicComponentProps<
  'button',
  ButtonProps
>;

type Intent = 'primary' | 'success' | 'warn' | 'danger';
interface OwnProps {
  intent?: Intent;
  children: React.ReactNode;
  className?: string;
}

const getColor = (type?: Intent) => {
  switch (type) {
    case 'primary':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'success':
      return 'bg-green-500 hover:bg-green-600';
    case 'warn':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'danger':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-blue-500 hover:bg-blue-600';
  }
};

type Props = OwnProps & ButtonProps & BP;

function ButtonContainer({ className, intent, children, ...rest }: Props) {
  return (
    <Button className={`${getColor(intent)} ${className}`} {...rest}>
      {children}
    </Button>
  );
}

export default ButtonContainer;
