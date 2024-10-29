"use client";

// THIS IS THE TASK EDITING PAGE. 

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

interface TaskForm {
  title: string;
  description: string;
}

const EditTaskPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params; // Task ID from the URL
  const { register, handleSubmit, setValue } = useForm<TaskForm>();
  const [loading, setLoading] = useState(true);

  // Fetch the existing task data when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        const task = response.data;

        // Set the default values in the form
        setValue("title", task.title);
        setValue("description", task.description);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, setValue]);

  // Handle form submission to update the task
  const onSubmit = async (data: TaskForm) => {
    try {
      await axios.put(`/api/tasks/${id}`, data); // Send the updated data to the API
      router.push("/"); // Navigate back to the task list after update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <p>Loading...</p>; // Show a loading state while fetching the task

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTaskPage;
