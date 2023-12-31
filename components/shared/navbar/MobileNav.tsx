'use client';

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-2 pt-12">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        // TODO

        return (
          <SheetClose asChild key={item.route}>
            <Link
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
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : ''}`}>{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevAcre"
          />

          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev <span className="text-primary-500">Acre</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="mt-4 flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button
                    className="small-medium btn-secondary
                    min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className="small-medium light-border-2 btn-tertiary
                    text-dark400_light900 min-h-[41px] w-full rounded-lg
                    border px-4 py-3 shadow-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="mt-16">
              <Button
                className=" text-dark400_light900 no-focus flex
                  w-full items-center justify-start gap-4
                    bg-transparent p-4 shadow-none"
                onClick={() => signOut(() => router.push('/'))}
              >
                <LogOut width={20} height={20} className={'invert-colors'} />
                <span className="base-medium">Logout</span>
              </Button>
            </div>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
