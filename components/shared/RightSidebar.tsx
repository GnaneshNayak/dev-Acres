import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import RenderTag from './RenderTag';

type Props = {};

const hotQuestion = [
  {
    id: 1,
    title:
      'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?',
  },
  {
    id: 2,
    title: ' Can I get the course for free?',
  },
  {
    id: 3,
    title: 'Redux Toolkit Not Updating State as Expected',
  },
  {
    id: 4,
    title: 'Async/Await Function Not Handling Errors Properly',
  },
  {
    id: 5,
    title: 'How do I use express as a custom server in NextJS?',
  },
];
const PopularTags = [
  {
    id: 1,
    title: 'React',
    totalQuestion: 12,
  },
  {
    id: 2,
    title: 'Next js ',
    totalQuestion: 3,
  },
  {
    id: 3,
    title: 'Tailwind',
    totalQuestion: 32,
  },
  {
    id: 4,
    title: 'Java',
    totalQuestion: 22,
  },
  {
    id: 5,
    title: 'NextJS?',
    totalQuestion: 222,
  },
];

const RightSidebar = (props: Props) => {
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
              href={`/questions/${q.id}`}
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
              key={p.id}
              _id={p.id}
              name={p.title}
              totalQuestions={p.totalQuestion}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
