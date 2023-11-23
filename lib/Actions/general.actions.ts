'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { SearchParams } from './shared.types';
import Question from '@/database/question.model';
import Answer from '@/database/answer.model';
import Tag from '@/database/tag.model';

const SearchableTypes = ['question', 'answer', 'tag', 'user'];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: 'i' };

    let results: any = [];

    const modelAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelAndTypes) {
        const queryResults = await model
          .find({
            [searchField]: regexQuery,
          })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === 'answer'
                ? `Answer containg ${query}`
                : item[searchField],
            type,
            id:
              type === 'user'
                ? item.clerkId
                : type === 'answer'
                ? item.question
                : item._id,
          })),
        );
      }
    } else {
      const modelInfo = modelAndTypes.find((model) => model.type === type);

      if (!modelInfo) {
        throw new Error('Invalid search type');
      }

      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          type === 'answer'
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === 'user'
            ? item.clerkId
            : type === 'answer'
            ? item.question
            : item._id,
      }));
    }
    console.log(results);
    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
