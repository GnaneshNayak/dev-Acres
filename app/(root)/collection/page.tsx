import QuestionCard from '@/components/cards/QuestionCard';
import Homefilters from '@/components/home/Homefilters';
import Filter from '@/components/shared/Filter';
import NoResults from '@/components/shared/NoResults';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters, QuestionFilters } from '@/constants/Filter';
import { getQuestions } from '@/lib/Actions/question.action';
import { getSavedQuestions } from '@/lib/Actions/user.action';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';

import React from 'react';

type Props = {};

const page = async (props: Props) => {
  const { userId } = auth();

  if (!userId) return null;

  const results = await getSavedQuestions({
    clerkId: userId!,
  });

  return (
    <>
      <div className=" flex w-full justify-between gap-4 sm:flex-row sm:items-center">
        <h1
          className="h1-bold text-dark100_light900
        
        "
        >
          Saved Questions
        </h1>
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
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions.map((question: any) => (
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
    </>
  );
};

export default page;
