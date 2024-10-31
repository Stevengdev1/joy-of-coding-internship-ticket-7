// THIS IS THE TASK EDITING PAGE. 
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

interface TaskForm {
  title: string;
  description: string;
  category: string;
}

const EditTaskPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const { register, handleSubmit, setValue } = useForm<TaskForm>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        const task = response.data;

        setValue("title", task.title);
        setValue("description", task.description);
        setValue("category", task.category || "Work");
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, setValue]);

  const onSubmit = async (data: TaskForm) => {
    try {
      await axios.put(`/api/tasks/${id}`, data);
      router.push("/todos");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

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

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register("category")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
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

