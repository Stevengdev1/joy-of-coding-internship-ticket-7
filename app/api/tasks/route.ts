import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; 
import prisma from "@/prisma/client";
import { createTasksSchema } from "@/app/validationSchemas";

// HTTP POST handling function
export async function POST(request: NextRequest) {                  // Define an asynchronous function to handle HTTP POST requests
    const body = await request.json();                              // Read the request body and parse it as JSON
    const validation = createTasksSchema.safeParse(body);           // Validate the parsed body against the defined schema

    if (!validation.success)                                        // If validation is not successful,
        return NextResponse.json(validation.error.format(), { status: 400 }); // Return validation errors as a JSON response with a 400 status code

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


