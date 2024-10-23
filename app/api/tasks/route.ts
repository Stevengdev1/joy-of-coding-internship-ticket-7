import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; 
import prisma from "@/prisma/client";
import { createTasksSchema } from "@/app/validationSchemas";

// HTTP POST handling function
export async function POST(request: NextRequest) {                  // Define an asynchronous function to handle HTTP POST requests.
    const body = await request.json();                              // Read the request body and parse it as JSON.
    const validation = createTasksSchema.safeParse(body);           // Validate the parsed body against the defined schema.

    if (!validation.success)                                        // If validation is not successful,
        return NextResponse.json(validation.error.format(), { status: 400 }); // Return validation errors as a JSON response with a 400 status code

// Create a new task in the database using Prisma client
    const newTask = await prisma.tasks.create({                     // Use Prisma to insert a new task record into the database.
        data: {
            title: body.title,                                      // Extract the title from the request body.
            description: body.description,                          // Extract the description from the request body.
            dueDate: validation.data.dueDate                        // Extract the validated due date (now a Date object).
        }
    });

    return NextResponse.json(newTask, { status: 201 });             // Return the newly created task as a JSON response with a 201 status code
}

// GET: Fetch all tasks
export async function GET() {                                       // Handle HTTP GET requests asynchronously
    try {
      const tasks = await prisma.tasks.findMany();                  // Use Prisma to retrieve all tasks from the database
      return NextResponse.json(tasks);                              // Respond with the tasks as JSON with 200 status (default)
    } catch (error) {                                               // If an error occurs during the query:
      console.error("Error fetching tasks:", error);                // Log the error for debugging
      return NextResponse.json(                                     // Respond with an error message and a 500 status code (server error)
        { error: "Failed to fetch tasks" },
        { status: 500 }
      );
    }
}


