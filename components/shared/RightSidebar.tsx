import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import RenderTag from './RenderTag';
import { getTopQuestions } from '@/lib/Actions/question.action';

import { getPopularTags } from '@/lib/Actions/tags.action';

type Props = {};

const RightSidebar = async (props: Props) => {
  const hotQuestion = await getTopQuestions({});
  const PopularTags = await getPopularTags({});

  return (
    <section
      className="
       background-light900_dark200 light-border custom-scrollbar
       sticky right-0 top-0 flex h-screen w-[356px]
       flex-col overflow-y-auto border-l p-6
       pt-36 shadow-light-300 dark:shadow-none max-xl:hidden
  "
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestion.map((q) => (
            <Link
              key={q.id}
              href={`/question/${q.id}`}
              className="flex cursor-pointer items-center justify-between
            gap-7"
            >
              <p className="body-medium text-dark500_light700">{q.title}</p>
              <Image
                src={'/assets/icons/chevron-right.svg'}
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark-200 dark:text-light-900">
          Popular Tags
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {PopularTags.map((p) => (
            <RenderTag
              key={p._id}
              _id={p._id}
              name={p.name}
              totalQuestions={p.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
