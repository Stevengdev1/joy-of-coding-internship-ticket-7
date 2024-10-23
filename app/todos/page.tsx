// This is the TASKS page, where all my tasks will render.

"use client"; 

import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";

interface Task {                                                        // Define the TypeScript interface for a Task object.
  id: number;                                                           // Task ID (number).
  title: string;                                                        // Task title (string).
  description: string;                                                  // Task description (string).
}

const TasksPage = () => {                                               // Defining the TasksPage component.
  const [tasks, setTasks] = useState<Task[]>([]);                       // Variable `tasks`created to store the list of tasks.

  // useEffect: Run this function when the component is rendered for the 1st time or as they call it in REACT "mounted".
  useEffect(() => {
    const fetchTasks = async () => {                                    // Define an async function to fetch tasks.
      try {
        const response = await axios.get("/api/tasks");                 // Make a GET request to the `/api/tasks` endpoint.
        setTasks(response.data);                                        // Store the fetched tasks in the `tasks` state.
      } catch (error) {                                                 // If an error occurs:
        console.error("Error fetching tasks:", error);                  // Log the error to the console.
      }
    };

    fetchTasks();                                                       // Call the fetchTasks function immediately when the component mounts.
  }, []);                                                               // (Empty dependency array) Will run only once when the component mounts.

  // Render the component's UI.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Your Tasks</h1>
        <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
          <Link href="/todos/new">New Task</Link>
        </Button>
      </div>

      {tasks.length === 0 ? (                                         // If no tasks are available, show a message.
        <p className="text-center text-white">No tasks available.</p>
      ) : (
                                                                      // If tasks exist, render them as a list.
        <ul className="space-y-4 max-w-xl mx-auto">
          {tasks.map((task) => (
                                                                      // Iterate over tasks using map function & render each task as a list item.
            <li key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-teal-600">{task.title}</h2> 
              <p className="text-gray-700">{task.description}</p> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;