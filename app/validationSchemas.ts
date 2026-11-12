import { z } from "zod";

const parseDateTime = (dateTimeString: string): Date => {
  return new Date(dateTimeString);
};

// Schema definition with due date as a string.
export const createTasksSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.'),
  dueDate: z.string().optional().refine((dateTimeString) => {
    if (!dateTimeString) return true;
    const date = parseDateTime(dateTimeString);
    return date > new Date(); 
  }, {
    message: 'Due date must be in the future.',
  }).transform((dateTimeString) => {
    if (!dateTimeString) return undefined;
    return parseDateTime(dateTimeString);
  }),
  category: z.string().optional(), 
});



