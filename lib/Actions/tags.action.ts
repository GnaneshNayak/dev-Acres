/* eslint-disable no-unused-vars */
'use server';
import Tag, { ITag } from './../../database/tag.model';

import Question from '@/database/question.model';
import User from '@/database/user.model';
import { _FilterQuery } from 'mongoose';
import { connectToDatabase } from '../mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';

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

    const tags = await Tag.find({});

    // if (!tags) throw new Error('no tags found');

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagsId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: _FilterQuery<ITag> = { _id: tagId };

    const tag: any = await Tag.findOne(tagFilter).populate({
      path: 'question',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    });

    if (!tag) throw new Error('No questions found');

    const question = tag.question;
    return { tagTitle: tag.name, question };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
