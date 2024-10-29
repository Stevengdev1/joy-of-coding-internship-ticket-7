import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

// Async handler for updating a task by its ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json(); // Extract the updated data from request body
    const updatedTask = await prisma.tasks.update({
      where: { id: Number(params.id) }, // Convert id to number if it's numeric
      data,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
