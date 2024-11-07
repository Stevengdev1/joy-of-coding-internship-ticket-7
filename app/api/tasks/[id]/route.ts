import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.tasks.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
  }
}

// Async handler for updating a task by its ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json(); // Extract the updated data from request body

    // Destructure `dueDate` and other task fields
    const { dueDate, ...otherData } = data;

    // Convert dueDate to a Date object (ISO-8601 format expected by Prisma)
    const formattedDueDate = dueDate ? new Date(dueDate) : null;

    const updatedTask = await prisma.tasks.update({
      where: { id: Number(params.id) }, // Convert id to number if it's numeric
      data: { ...otherData, dueDate: formattedDueDate },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update the task" }, { status: 500 });
  }
}
