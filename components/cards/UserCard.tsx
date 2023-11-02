import { getTopInteractedTags } from '@/lib/Actions/tags.action';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import RenderTag from '../shared/RenderTag';

type Props = {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    username: string;
    name: string;
  };
};

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <article
      className="background-light900_dark200 light-border shadow-light100_darknone flex w-full flex-col items-center
     justify-center rounded-2xl border p-8 max-xs:min-w-full xs:w-[260px]"
    >
      <Link
        href={`/profile/${user.clerkId}`}
        className="flex flex-col items-center"
      >
        <Image
          src={user.picture}
          alt="User DP"
          width={100}
          height={100}
          className="rounded-full"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1 ">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
      </Link>
      <div className="mt-5">
        {interactedTags.length > 0 ? (
          <div className="flex items-center gap-2">
            {interactedTags.map((tag) => (
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>No Tags yet...</Badge>
        )}
      </div>
    </article>
  );
};

export default UserCard;
