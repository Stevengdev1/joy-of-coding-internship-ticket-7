import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; 
import prisma from "@/prisma/client";

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

// HTTP POST handling function
export async function POST(request: NextRequest) {                  // Define an asynchronous function to handle HTTP POST requests
    const body = await request.json();                              // Read the request body and parse it as JSON
    const validation = createTasksSchema.safeParse(body);           // Validate the parsed body against the defined schema

    if (!validation.success)                                        // If validation is not successful,
        return NextResponse.json(validation.error.errors, { status: 400 }); // Return validation errors as a JSON response with a 400 status code

// Create a new task in the database using Prisma client
    const newTask = await prisma.tasks.create({                     // Create a new task record in the database
        data: {
            title: body.title,                                      // Title taken from request body
            description: body.description,                          // Description taken from request body
            dueDate: validation.data.dueDate                        // Use the transformed dueDate (now a Date object)
        }
    });

    return NextResponse.json(newTask, { status: 201 });             // Return the newly created task as a JSON response with a 201 status code
}


