import { UseFormReturnType } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import moment from 'moment';

interface Props<T> {
  className?: string;
  error?: React.ReactNode;
  form?: UseFormReturnType<T>;
  helpText?: string;
  id: string;
  label?: string;
  onChange?: (value: Date) => void;
  placeHolder?: string;
  readOnly?: boolean;
  value: Date | null;
}

function DateInputContainer<T>({
  error,
  form,
  helpText,
  id,
  label,
  onChange,
  placeHolder,
  readOnly,
  value,
}: Props<T>) {
  return (
    <>
      {readOnly ? (
        <div className='flex'>
          <div className='font-bold mr-[20px]'>{label}: </div>
          <div>{moment(new Date(value || '')).format('YYYY-MM-DD')}</div>
        </div>
      ) : (
        <>
          {form ? (
            <DateInput
              clearable={true}
              {...form.getInputProps(id)}
              label={label}
              placeholder={placeHolder}
              className='mx-[17px]'
            />
          ) : (
            <DateInput
              clearable={true}
              label={label}
              placeholder={placeHolder}
              className='mx-[17px]'
              value={value}
              onChange={(e) => {
                if (onChange && e) {
                  onChange(e);
                }
              }}
            />
          )}
          {error ? <p className='text-[#bb4343]'>{error}</p> : null}
          {helpText ? <span>{helpText}</span> : null}
        </>
      )}
    </>
  );
}

export default DateInputContainer;
