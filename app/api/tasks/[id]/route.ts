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
