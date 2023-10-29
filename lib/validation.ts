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
  explanation: z.string().max(250, {
    message: 'Minimum of 250 characters.',
  }),
  tags: z
    .array(z.string().min(1).max(15))
    .min(1, {
      message: 'Add at least one tag.',
    })
    .max(5),
});
