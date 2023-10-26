import Homefilters from '@/components/home/Homefilters';
import Filter from '@/components/shared/Filter';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/Filter';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className=" flex w-full justify-between gap-4 sm:flex-row sm:items-center">
        <h1
          className="h1-bold text-dark100_light900
        
        "
        >
          All Questions
        </h1>
        <Link href="/ask-questions" className="flex ">
          <Button
            className="primary-gradient min-h-[46px]
            px-4 py-3
           !text-light-900"
          >
            Ask a question?
          </Button>
        </Link>
      </div>
      <div
        className="mt-11 flex justify-between gap-5 
       max-sm:flex-col sm:items-center"
      >
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <Homefilters filters={HomePageFilters} />
    </>
  );
}
