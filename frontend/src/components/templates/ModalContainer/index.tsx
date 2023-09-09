import { Modal } from '@mantine/core';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  title?: React.ReactNode;
}

const ModalContainer: FC<Props> = ({ children, onClose, title }) => {
  return (
    <Modal opened={true} onClose={onClose} title={title} size={'xl'}>
      {children}
    </Modal>
  );
};

export default ModalContainer;
