import { Switch } from '<>';
import { useEffect, useState } from 'react';

interface Props {
  keys: string[];
  values?: string[];
  onChange?: (e: { target: { value: Array<string> } }) => void;
  error?: undefined | string | never[] | string[]
}

const ListSwitch = ({ keys, onChange, error, values = [] }: Props) => {
  useEffect(() => {
    onChange && onChange({ target: { value: values } });
  }, [values]);

  const handleToggle = (value: string) => {
    if (values.includes(value)) {
      onChange &&
        onChange({ target: { value: values.filter((val) => val !== value) } });
    } else {
      onChange && onChange({ target: { value: [...values, value] } });
    }
  };

  return (
    <>
      {keys.map((value, index) => (
        <Switch
          key={index}
          name={value}
          label={value}
          onChange={() => handleToggle(value)}
          checked={values.includes(value)}
        />
      ))}
      {error &&< span className='text-red-500'>{error}</span>}
    </>
  );
};

export default ListSwitch;
