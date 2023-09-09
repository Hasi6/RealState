import { TextInput, Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

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
  type?: 'email' | 'text' | 'number' | 'password';
  value?: string;
}

function TextAreaContainer<T>({
  className,
  error,
  form,
  helpText,
  id,
  label,
  onChange,
  placeHolder,
  type,
  value,
  readOnly
}: Props<T>) {
  return (
    <>
      {readOnly ? (
        <div className="flex">
          <div className="font-bold mr-[20px]">{label}: </div>
          {/* @ts-ignore */}
          <div>{form?.values?.[id]}</div>
        </div>
      ) : (
        <>
          {form ? (
            <Textarea
              label={label}
              size="lg"
              id={id}
              {...form.getInputProps(id)}
              // @ts-ignore
              value={form.values?.[id]}
              placeholder={placeHolder}
              className={`${
                error ? '!border-[#bb4343]' : ''
              } w-full px-[16px] outline-none ${className ? className : ''}`}
            />
          ) : (
            <Textarea
              className={`${
                error ? '!border-[#bb4343]' : ''
              } bg-[#EBEBF5] w-full px-[16px] py-[14px] outline-none ${
                className ? className : ''
              }`}
              id={id}
              label={label}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
              placeholder={placeHolder}
              value={value}
            />
          )}
          {error ? <p className="text-[#bb4343]">{error}</p> : null}
          {helpText ? <span>{helpText}</span> : null}
        </>
      )}
    </>
  );
}

export default TextAreaContainer;
