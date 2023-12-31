import Answer from '@/components/form/Answer';
import AllAnswer from '@/components/shared/AllAnswer';
import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import RenderTag from '@/components/shared/RenderTag';
import Votes from '@/components/shared/Votes';
import { getQuestionById } from '@/lib/Actions/question.action';
import { getUserById } from '@/lib/Actions/user.action';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';

import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { id: string };
  searchParams: any;
};

const page = async ({ params: { id }, searchParams }: Props) => {
  const result = await getQuestionById({ questionId: id });
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div
          className="flex w-full flex-col-reverse
         justify-between gap-5 sm:flex-row sm:items-center sm:gap-2"
        >
          <Link
            href={`/profile/${result.author._id}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="profile image"
              width={23}
              height={23}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark-300 dark:text-light-700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upVotes={result.upvotes.length}
              hasupVotes={result.upvotes.includes(mongoUser?._id)}
              downvotes={result.downvotes.length}
              hasdownVotes={result.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark300_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimestamp(result.createdAt)}`}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <AllAnswer
        questionId={result._id}
        userId={mongoUser?._id}
        totalAnswer={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer
        questionId={JSON.stringify(result._id)}
        userId={JSON.stringify(mongoUser)}
        question={result.content}
      />
    </>
  );
};

export default page;
