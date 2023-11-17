import Question from '@/components/form/Question';
import { getQuestionById } from '@/lib/Actions/question.action';
import { getUserById } from '@/lib/Actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return redirect('/sign-in');

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      </div>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={JSON.stringify(mongoUser?._id)}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default page;
