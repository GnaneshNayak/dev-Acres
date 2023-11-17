import Filter from '@/components/shared/Filter';
import NoResults from '@/components/shared/NoResults';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { TagFilters } from '@/constants/Filter';
import { getALlTags } from '@/lib/Actions/tags.action';
import { SearchParamsProps } from '@/types';
import Link from 'next/link';

import React from 'react';

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getALlTags({
    searchQuery: searchParams.q,
  });

  return (
    <div>
      <h1 className="h1-bold">Tags</h1>
      <div
        className="mt-11 flex justify-between gap-5 
       max-sm:flex-col sm:items-center"
      >
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search By tag name"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses=" max-md:flex"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              className="shadow-light100_darknone"
              key={tag._id}
            >
              <article
                className="light-border background-light900_dark200 flex
        w-full flex-col
       rounded-2xl border-2 bg-light-900 px-8 py-10 dark:bg-dark-200 sm:w-[260px]"
              >
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>
                <p className="small-medium  text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.question.length}+
                  </span>{' '}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResults
            title="No Tags found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTittle="Ask a question"
          />
        )}
      </section>
    </div>
  );
};

export default Page;
