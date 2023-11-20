'use client';
import React, { useState } from 'react';

import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  filters: {
    name: string;
    value: string;
  }[];
};

const Homefilters = ({ filters }: Props) => {
  const [active, setActive] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleTypeClick = (item: string) => {
    setActive(item);
    if (active === item) {
      setActive('');
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden justify-center gap-3 md:flex">
      {filters.map((item) => (
        <Button
          key={item.value}
          onClickCapture={() => handleTypeClick(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize
          shadow-none ${
            active === item.value
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
