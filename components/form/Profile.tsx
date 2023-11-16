'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '../ui/form';
import { Input } from '../ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ProfileSchema } from '@/lib/validation';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/Actions/user.action';

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedUser = JSON.parse(user);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolioLink: parsedUser.portfolioWebsite || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || '',
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          bio: values.bio,
          location: values.location,
          portfolioWebsite: values.portfolioLink,
        },
        path: pathname,
      });
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-9"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark-500 dark:text-light-900">
                  Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=" Your name"
                    {...field}
                    className="
                  no-focus paragraph-regular light-border-2
                  background-light700_dark300 text-dark300_light700 min-h-[56px]
                  border
                  "
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark-500 dark:text-light-900">
                  Username <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your username"
                    {...field}
                    className="
                  no-focus paragraph-regular light-border-2
                  background-light700_dark300 text-dark300_light700 min-h-[56px]
                  border
                  "
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark-500 dark:text-light-900">
                  Portfolio Link
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Your portfolio URL"
                    {...field}
                    className="
                  no-focus paragraph-regular light-border-2
                  background-light700_dark300 text-dark300_light700 min-h-[56px]
                  border
                  "
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark-500 dark:text-light-900">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Where are you from?"
                    {...field}
                    className="
                  no-focus paragraph-regular light-border-2
                  background-light700_dark300 text-dark300_light700 min-h-[56px]
                  border
                  "
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark-500 dark:text-light-900">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's special about you?"
                    {...field}
                    className="
                  no-focus paragraph-regular light-border-2
                  background-light700_dark300 text-dark300_light700 min-h-[156px]
                  border
                  "
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="mt-7 flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Profile;
