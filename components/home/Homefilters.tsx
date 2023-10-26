'use client';
import React from 'react';

import { Button } from '../ui/button';

type Props = {
  filters: {
    name: string;
    value: string;
  }[];
};

const Homefilters = ({ filters }: Props) => {
  const isActive = 'newest';
  return (
    <div className="mt-10 hidden justify-center gap-3 md:flex">
      {filters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize
          shadow-none ${
            isActive === item.value
              ? 'bg-primary-100 text-primary-500'
              : 'bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400'
          }
          `}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default Homefilters;
