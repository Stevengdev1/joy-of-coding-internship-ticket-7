// THIS IS THE TASK EDITING PAGE. 
"use client"; 

import React, { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form"; 
import axios from "axios"; 

interface TaskForm {                                                // Define form fields
  title: string;
  description: string;
  category: string;
  dueDate: string; 
}

const EditTaskPage = ({ params }: { params: { id: string } }) => {  // Define component accepting URL params
  const router = useRouter();                                       // Initialize router for navigation
  const { id } = params;                                            // Destructure `id` from params to identify the task
  const { register, handleSubmit, setValue } = useForm<TaskForm>(); // Initialize form functions from useForm
  const [loading, setLoading] = useState(true);                     // State to manage loading status

  useEffect(() => {
    const fetchTask = async () => {                                 // Function to fetch task data based on task ID
      try {
        const response = await axios.get(`/api/tasks/${id}`);       // Send GET request to retrieve task details
        const task = response.data;                                 // Extract task data from the response

        setValue("title", task.title);                              // Populate title field with fetched task title
        setValue("description", task.description);                  // Populate description field with task description
        setValue("dueDate", task.dueDate);                          // Populate dueDate field with task's due date
        setValue("category", task.category || "Work");              // Populate category with task category, defaulting to "Work"
      } catch (error) {
        console.error("Error fetching task:", error);               // Log any errors that occur
      } finally {
        setLoading(false);                                          // Set loading to false after task data is loaded or fails
      }
    };

    fetchTask();                                                    // Invoke fetchTask on component mount
  }, [id, setValue]);                                               // Only re-run fetchTask if `id` or `setValue` changes

  const onSubmit = async (data: TaskForm) => {                      // Handle form submission with the updated task data
    try {
      await axios.put(`/api/tasks/${id}`, data);                    // Send PUT request to update the task
      router.push("/todos");                                        // Redirect to the task list page after successful update
    } catch (error) {
      console.error("Error updating task:", error);                 // Log any errors during the update process
    }
  };

  if (loading) return <p>Loading...</p>;                            // Show loading text if data is still being fetched

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> 
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label> 
        <input
          type="text"
          {...register("title", { required: true })}                // Register title field with validation
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label> 
        <textarea
          {...register("description", { required: true })}          // Register description field with validation
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label> 
        <input
          type="date"
          {...register("dueDate")}                                  // Register due date field (optional)
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label> 
        <select
          {...register("category")}                                 // Register category field
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="Work">Work</option> 
          <option value="Personal">Personal</option> 
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        Update Task
      </button>
    </form>
  );
};

export default EditTaskPage; 


