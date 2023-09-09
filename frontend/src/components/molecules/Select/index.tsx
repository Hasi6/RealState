import { Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import FormContainer from '@/containers/Form';

interface Props<T> {
  className?: string;
  error?: React.ReactNode;
  form?: UseFormReturnType<T>;
  helpText?: string;
  id: string;
  label?: string;
  onChange?: (value: string) => void;
  placeHolder?: string;
  readOnly?: boolean;
  value?: string;
  data: FormContainer.SelectOption[];
}

function SelectContainer<T>({
  data,
  error,
  form,
  helpText,
  id,
  label,
  onChange,
  placeHolder,
  readOnly,
  value
}: Props<T>) {
  return (
    <>
      {readOnly ? (
        <div className="flex">
          <div className="font-bold mr-[20px]">{label}: </div>
          <div>{value}</div>
        </div>
      ) : (
        <>
          {form ? (
            <Select
              {...form.getInputProps(id)}
              label={label}
              placeholder={placeHolder}
              // @ts-ignore
              data={data || []}
              className="mx-[17px]"
              clearable={true}
            />
          ) : (
            <Select
              label={label}
              placeholder={placeHolder}
              // @ts-ignore
              data={data || []}
              className="mx-[17px]"
              clearable={true}
              value={value}
              onChange={(e) => {
                if (onChange) {
                  onChange(e || '');
                }
              }}
            />
          )}
          {error ? <p className="text-[#bb4343]">{error}</p> : null}
          {helpText ? <span>{helpText}</span> : null}
        </>
      )}
    </>
  );
}

export default SelectContainer;
