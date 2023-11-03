/* eslint-disable no-unused-vars */
'use client';
import React, { useRef, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

import { AnswerSchema } from '@/lib/validation';
import { z } from 'zod';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';

type Props = {};

const Answer = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mode } = useTheme();

  const editorRef = useRef();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  });

  async function handleCreateAnswer(values: z.infer<typeof AnswerSchema>) {
    console.log(values);
  }
  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          className="btn light-border gap-1.5 rounded-md
        px-4 text-primary-500 shadow-none dark:text-primary-500
        "
        >
          <Image
            src={'/assets/icons/stars.svg'}
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an Ai Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateAnswer)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY!}
                    // @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 300,
                      width: ' 100%',
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'codesample',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light',
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className=" flex justify-end">
            <Button
              type="submit"
              className="w-fit   bg-primary-500 
          !text-light-900 "
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Answer'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Answer;
