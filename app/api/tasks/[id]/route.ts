import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

//Async handler for deleting a task by its ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;                                                                  // Destructure the `id` parameter from the URL params
  try {
    await prisma.tasks.delete({
      where: { id: parseInt(id) },                                                        // Delete the task with the specified ID, 
    });                                                                                   // converting `id` to an integer
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });  // Return success message with status 200
  } catch (error) {
    console.error("Error deleting task:", error);                                         // Log any error that occurs during the delete operation
    return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });      // Return error message with status 500
  }
}

// Async handler for updating a task by its ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();                                                    // Extract the updated data from request body
    const { dueDate, ...otherData } = data;                                               // Destructure `dueDate` and other task fields
    const formattedDueDate = dueDate ? new Date(dueDate) : null;                          // Convert dueDate to a Date object (ISO-8601 format expected by Prisma)
    const updatedTask = await prisma.tasks.update({
      where: { id: Number(params.id) },                                                   // Convert id to number if it's numeric
      data: { ...otherData, dueDate: formattedDueDate },                                  // Update the task fields in the database, including dueDate if provided
    });
    return NextResponse.json(updatedTask);                                                // Return the updated task data as JSON
  } catch (error) {
    console.error("Error updating task:", error);                                         // Log any error that occurs during the update operation
    return NextResponse.json({ error: "Failed to update the task" }, { status: 500 });    // Return error message with status 500
  }
}

