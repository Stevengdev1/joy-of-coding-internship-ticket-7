import { z } from "zod";

// Function for date string in MM-DD-YYYY format
const parseDate = (dateString: string): Date => {                   // Define a function that takes a string and returns a Date
    const [month, day, year] = dateString.split('-').map(Number);   // Split the date string into month, day, and year, converting them to numbers
    return new Date(year, month - 1, day);                          // Create and return a new Date object (month is 0-indexed in JavaScript Date)
};

// Schema definition with dueDate as a string
export const createTasksSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),        // Define title as a required string with a minimum length of 1 and maximum length of 255
    description: z.string().min(1, 'Description is required.'),     // Define description as a required string with a minimum length of 1
    dueDate: z.string().optional().refine((dateString) => {         // Define dueDate as an optional string and validate it
        if (!dateString) return true;                               // If dateString is not provided, it's valid
        const date = parseDate(dateString);                         // Parse the dateString into a Date object
        return date > new Date();                                   // Check if the parsed date is in the future
    }, {
        message: 'Due date must be in the future.',                 // Error message if validation fails
    }).transform((dateString) => {                                  // Transform the validated string into a Date object
        if (!dateString) return undefined;                          // Return undefined if dateString is not provided
        return parseDate(dateString);                               // Parse the dateString into a Date object
    }), 
});

