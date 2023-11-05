'use server';

import { CreateAnswerParams, GetAnswersParams } from './shared.types';
import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import Answer from '@/database/answer.model';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, path, question } = params;
    console.log(params);

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
