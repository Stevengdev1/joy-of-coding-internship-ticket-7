import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; 
import prisma from "@/prisma/client";
import { createTasksSchema } from "@/app/validationSchemas";

// POST: Create a new task
export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Parse request body as JSON

        // Validate the request body against the Zod schema
        const validation = createTasksSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // Create a new task in the database using the validated data
        const newTask = await prisma.tasks.create({
            data: {
                title: validation.data.title,
                description: validation.data.description,
                dueDate: validation.data.dueDate ?? null, // Optional dueDate handling
                category: validation.data.category ?? null, // Optional category handling
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            { error: "Failed to create task" },
            { status: 500 }
        );
    }
}

// GET: Fetch all tasks
export async function GET() {
    try {
        const tasks = await prisma.tasks.findMany();
        return NextResponse.json(tasks); // Return tasks as JSON
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}



