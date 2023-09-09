import React, { useState } from 'react';

import ModalContainer from '@/components/templates/ModalContainer';
import ButtonContainer from '@/components/atoms/Button';

interface Props {
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  description: string;
  iconButton: React.ReactNode;
  loading: boolean;
  onConfirm: () => void;
  title: string;
}

function ConfirmModal({
  cancelText,
  confirmText,
  description,
  iconButton,
  loading,
  onConfirm,
  title,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(true)}>{iconButton}</div>
      {open && (
        <ModalContainer onClose={() => setOpen(false)} title={title}>
          <div>
            <div>{description}</div>
            <div className='my-[10px] flex justify-end'>
              <ButtonContainer
                className='mx-[10px]'
                disabled={loading}
                intent='warn'
                onClick={() => setOpen(false)}
              >
                {cancelText ?? 'Cancel'}
              </ButtonContainer>
              <ButtonContainer
                className='mx-[10px]'
                intent='primary'
                loading={loading}
                onClick={onConfirm}
              >
                {confirmText ?? 'Confirm'}
              </ButtonContainer>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
}

export default ConfirmModal;
