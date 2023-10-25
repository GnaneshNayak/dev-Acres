'use client';

import { sidebarLinks } from '@/constants';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import React from 'react';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar
        sticky left-0 top-0 flex 
    h-screen flex-col overflow-y-auto  border-r p-6 pt-36 
    shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          // todo
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className="invert-colors"
              />
              <p
                className={`${
                  isActive ? 'base-bold' : 'base-medium'
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button
              className="btn-secondary
                    min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden ">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button
              className="light-border-2 btn-tertiary
                    text-dark400_light900 min-h-[41px] w-full rounded-lg
                    border px-4 py-3 shadow-none"
            >
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className=" max-lg:hidden ">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <Button
          className=" text-dark400_light900
                   flex justify-start gap-3 p-4"
          onClick={() => signOut(() => router.push('/'))}
        >
          <LogOut width={20} height={20} />
          <span className="base-medium">Logout</span>
        </Button>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
