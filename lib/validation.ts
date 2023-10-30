import * as z from 'zod';

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters.',
    })
    .max(120, {
      message: "Title mustn't be longer then 130 characters.",
    }),
  explanation: z.string().min(20, {
    message: 'Minimum of 20 characters.',
  }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
