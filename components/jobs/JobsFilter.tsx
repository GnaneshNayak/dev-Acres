'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LocalSearchbar from '../shared/search/LocalSearchbar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { formUrlQuery } from '@/lib/utils';
import { Country } from '@/types';

interface Props {
  countryList: Country[];
}

const JobsFilter = ({ countryList }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'location',
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className="relative mt-11 flex w-full justify-between 
    gap-5 max-sm:flex-col sm:items-center"
    >
      <LocalSearchbar
        route={pathname}
        iconPosition="left"
        imgSrc="/assets/icons/job-search.svg"
        placeholder="Job Title, Company, or Keywords"
        otherClasses="flex-1 max-sm:w-full"
      />

      <Select onValueChange={(v) => handleUpdateParams(v)}>
        <SelectTrigger
          className="body-regular background-light800_dark300 
        text-dark500_light700 line-clamp-1 flex min-h-[56px]
        items-center gap-3 border
        p-4 sm:max-w-[210px]
        "
        >
          <Image
            src="/assets/icons/carbon-location.svg"
            alt="location"
            width={18}
            height={18}
          />
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select Location" />
          </div>
        </SelectTrigger>

        <SelectContent
          className="body-semibold 
        relative
        max-h-[350px]
        max-w-[250px]
        border-none bg-light-900 text-dark-200
        dark:bg-dark-300 dark:text-light-800
        "
        >
          <SelectGroup>
            {countryList ? (
              countryList.map((country: Country) => (
                <SelectItem
                  key={country.name.common}
                  value={country.name.common}
                  className="px-4 py-3  focus:bg-light-800 dark:focus:bg-dark-400"
                >
                  {country.name.common}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="No results found">No results found</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobsFilter;
