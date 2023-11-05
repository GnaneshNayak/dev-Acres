import React from 'react';
import Filter from './Filter';
import { AnswerFilters } from '@/constants/Filter';
import { getAnswers } from '@/lib/Actions/asnwer.action';
import ParseHTML from './ParseHTML';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';

type Props = {
  questionId: string;
  userId: string;
  totalAnswer: string;
  page?: number;
  filter?: number;
};

const AllAnswer = async ({ questionId, userId, totalAnswer }: Props) => {
  const result = await getAnswers({ questionId });
  console.log('Anser:', result.answer);
  return (
    <div className="my-11">
      <div className=" flex items-center justify-between ">
        <h3 className="primary-text-gradient">{totalAnswer} Answers</h3>
        <Filter
          filters={AnswerFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses=" max-md:flex"
        />
      </div>
      <div>
        {result.answer.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div
                className="mb-8 flex w-full flex-col-reverse justify-between 
              gap-5 sm:flex-row sm:items-center sm:gap-2"
              >
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>

                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">VOTING VOTING</div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswer;
