import { NextRequest, NextResponse } from "next/server";                        
import { z } from "zod";                                                        
import prisma from "@/prisma/client";                                           
import { createTasksSchema } from "@/app/validationSchemas";                    

// POST: Create a new task
export async function POST(request: NextRequest) {                                  // Create an async function for handling POST requests
    try {
        const body = await request.json();                                          // Parse request body as JSON
                                                                                    // Validate the request body against the Zod schema
        const validation = createTasksSchema.safeParse(body);                       // Validate JSON data against the task schema
        if (!validation.success) {                                                  // If validation is not successful:
            return NextResponse.json(validation.error.format(), { status: 400 });   // Return formatted errors with a 400 status
        }
        const newTask = await prisma.tasks.create({                                 // Create a new task in the database using the validated data
            data: {                                                                 // Prepare data for task creation
                title: validation.data.title,                                       // Title field from validated data
                description: validation.data.description,                           // Description field from validated data
                dueDate: validation.data.dueDate ?? null,                           // Optional dueDate, set to null if absent
                category: validation.data.category ?? null,                         // Optional category, set to null if absent
            },
        });
        return NextResponse.json(newTask, { status: 201 });                         // Return created task as JSON with 201 status
    } catch (error) {
        console.error("Error creating task:", error);                               // Log any error during task creation
        return NextResponse.json(                                               
            { error: "Failed to create task" },                                     // Return error message
            { status: 500 }                                                         // Set status to 500 for server error
        );
    }
}

// GET: Fetch all tasks
export async function GET() {                                                       // Create an async function for handling GET requests
    try {
        const tasks = await prisma.tasks.findMany();                                // Fetch all tasks from the database
        return NextResponse.json(tasks);                                            // Return tasks as JSON
    } catch (error) {
        console.error("Error fetching tasks:", error);                              // Log any error during fetching tasks
        return NextResponse.json(
            { error: "Failed to fetch tasks" },                                     // Return error message if fetch fails
            { status: 500 }                                                         // Set status to 500 for server error
        );
    }
}




