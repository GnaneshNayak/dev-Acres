import QuestionCard from '@/components/cards/QuestionCard';
import Homefilters from '@/components/home/Homefilters';
import Filter from '@/components/shared/Filter';
import NoResults from '@/components/shared/NoResults';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/Filter';
import {
  getQuestions,
  getRecommendedQuestions,
} from '@/lib/Actions/question.action';
import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dev Acres | Home Page',
  description: 'Home page of Dev Acres',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  let results;

  if (searchParams?.filter === 'recommended') {
    if (userId) {
      results = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      results = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    results = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className=" flex w-full justify-between gap-4 sm:flex-row sm:items-center">
        <h1
          className="h1-bold text-dark100_light900
        "
        >
          All Questions
        </h1>
        <Link href="/ask-question" className="flex ">
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

      <div className="mt-10 flex w-full flex-col gap-6">
        {results?.questions.length > 0 ? (
          results?.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title=" There are no question to show"
            description="  Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTittle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={results.isNext}
        />
      </div>
    </>
  );
}
