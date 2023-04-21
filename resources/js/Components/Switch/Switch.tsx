import React, { HTMLAttributes, useEffect, useId, useState } from 'react';
import { Switch as Switcher } from '@headlessui/react';
import {Form, Formik} from "formik"

interface Props extends  React.ComponentPropsWithoutRef<typeof Switcher> {
  label?: string;
  error?: string | undefined;
  checked? :boolean
  name:string
  disabled?: boolean
}

export default function Switch({ label,error, name, checked=false,disabled=false, ...rest }: Props) {
  const [enabled, setEnabled] = useState(checked);
  useEffect(()=>{
    setEnabled(checked);
  },[checked])

  return (
    <Switcher.Group>
      <div className="flex gap-1">
        <Switcher
          id={name}
          name={name}
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          // @ts-ignore
          disabled={disabled}
          {...rest}
        >
          <span className="sr-only">{label}</span>
          <span
            className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switcher>
        <Switcher.Label>{label}</Switcher.Label>
      </div>
    </Switcher.Group>
  );
}
