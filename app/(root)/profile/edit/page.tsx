import Profile from '@/components/form/Profile';
import { getUserById } from '@/lib/Actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      </div>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default page;
