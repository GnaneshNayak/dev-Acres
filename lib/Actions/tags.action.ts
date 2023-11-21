/* eslint-disable no-unused-vars */
'use server';

import Question from '@/database/question.model';

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types.d';
import Tag, { ITag } from './../../database/tag.model';

import User from '@/database/user.model';
import { FilterQuery, _FilterQuery } from 'mongoose';
import { connectToDatabase } from '../mongoose';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) throw new Error('user not found');

    // find the interactions for the user and  group by tags...
    // interaction db...

    return [
      { _id: '1', name: 'tag' },
      { _id: '2', name: 'tag2' },
      { _id: '3', name: 'tag3' },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getALlTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 6 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, 'i') } }];
    }
    let sortOptions = {};

    switch (filter) {
      case 'popular':
        sortOptions = {
          question: -1,
        };
        break;

      case 'recent':
        sortOptions = {
          createdAt: -1,
        };
        break;

      case 'name':
        sortOptions = {
          name: 1,
        };
        break;

      case 'old':
        sortOptions = {
          createdAt: 1,
        };
        break;

      default:
        break;
    }

    const tags = await Tag.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    // if (!tags) throw new Error('no tags found');

    const totalTags = await Tag.countDocuments(query);

    //  100  => 4 * 20 + 20 = 100

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagsId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();

    const { tagId, page = 1, pageSize = 5, searchQuery } = params;

    const skipAmount = (page - 1) * pageSize;

    const tagFilter: _FilterQuery<ITag> = { _id: tagId };

    const tag: any = await Tag.findOne(tagFilter).populate({
      path: 'question',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    });

    if (!tag) throw new Error('No questions found');

    const isNext = tag.question.length > pageSize;

    const question = tag.question;

    return { tagTitle: tag.name, question, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: '$question' },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    // if (!tags) throw new Error('no tags found');

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
