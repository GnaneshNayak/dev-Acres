'use client';
import { downVoteAnswer, upVoteAnswer } from '@/lib/Actions/asnwer.action';
import { viewQuestion } from '@/lib/Actions/interaction.action';

import {
  downVoteQuestion,
  upVoteQuestion,
} from '@/lib/Actions/question.action';
import { toggleSaveQuestion } from '@/lib/Actions/user.action';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect } from 'react';
import { toast } from '../ui/use-toast';

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
  const router = useRouter();

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  const handleVote = async (action: string) => {
    if (!userId)
      return toast({
        title: 'Please log in',
        description: 'You must be logged in to vote',
      });

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

      return toast({
        title: `Upvote ${!hasupVotes ? 'Successfull' : 'Removed'}`,
        variant: !hasupVotes ? 'default' : 'destructive',
      });
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
      return toast({
        title: `Downvote ${!hasdownVotes ? 'Successful' : 'Removed'}`,
        variant: !hasdownVotes ? 'default' : 'destructive',
      });
    }
  };
  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
    return toast({
      title: `Question ${!hasSaved ? 'Saved' : 'Unsaved'}`,
      variant: !hasupVotes ? 'default' : 'destructive',
    });
  };

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
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
