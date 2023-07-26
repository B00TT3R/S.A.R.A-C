import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { classNames } from '@/Utils'

interface props{
  items: {
    label: string;
    element: JSX.Element;
  }[]
}
  

export default function Tabs({items}:props) {

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-slate-100 dark:bg-slate-950 p-2">
          {items.map((item, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'focus:outline-none',
                  "transition-all box-border border",
                  "border-slate-300",
                  "dark:border-slate-700",
                  selected
                    ? 'bg-black shadow text-white dark:bg-white dark:text-slate-900'
                    : classNames(
                      'text-slate-600 hover:bg-slate-200 hover:text-black hover:border-slate-300',
                      'dark:text-slate-200 dark:hover:bg-slate-600 dark:hover:text-white dark:bg-slate-900',
                      )
                )
              }
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {items.map((item, i) => (
            <Tab.Panel
              key={i}
              
            >
              {item.element}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
