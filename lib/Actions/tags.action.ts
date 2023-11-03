'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types';
import Tag from '@/database/tag.model';

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
