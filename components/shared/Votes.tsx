'use client';
import { downVoteAnswer, upVoteAnswer } from '@/lib/Actions/asnwer.action';
import {
  downVoteQuestion,
  upVoteQuestion,
} from '@/lib/Actions/question.action';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import React from 'react';

type Props = {
  type: string;
  itemId: string;
  userId: string;
  upVotes: number;
  hasupVotes: boolean;
  downvotes: number;
  hasdownVotes: boolean;
  hasSaved?: boolean;
};

const Votes = ({
  type,
  itemId,
  userId,
  upVotes,
  hasupVotes,
  downvotes,
  hasdownVotes,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  console.log(itemId);

  const handleVote = async (action: string) => {
    if (!userId) return;

    if (action === 'upvote') {
      if (type === 'Question') {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupVotes,
          hasdownVoted: hasdownVotes,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await upVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupVotes,
          hasdownVoted: hasdownVotes,
          path: pathname,
        });
      }

      // todo show toast message
      return;
    }
    if (action === 'downvote') {
      if (type === 'Question') {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupVotes,
          hasdownVoted: hasdownVotes,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupVotes,
          hasdownVoted: hasdownVotes,
          path: pathname,
        });
      }
      // todo show a toast
    }
  };
  // const handleSave = () => {};

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVotes
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt="upvotes"
            className="cursor-pointer"
            onClick={() => handleVote('upvote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upVotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVotes
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt="upvotes"
            className="cursor-pointer"
            onClick={() => handleVote('downvote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === 'Question' && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          // onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
