'use server';

import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from './shared.types';
import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import Answer from '@/database/answer.model';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, path, question } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(
      { _id: question },
      { $push: { answers: newAnswer._id } },
    );

    // todo  Add interaction

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    const answer = await Answer.find({
      question: questionId,
    }).populate('author', '_id clerkId name picture');
    return { answer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error('Answer not found');
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error('Answer not found');
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
