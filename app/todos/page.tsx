

"use client";

// // THIS IS MY TASKS LISTING PAGE.

import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";

interface Task {                                                        
  id: number;                                                           
  title: string;                                                        
  description: string;                                                  
  dueDate: string | null;                                               
}

const TasksPage = () => {                                               
  const [tasks, setTasks] = useState<Task[]>([]);                       

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {                                    
      try {
        const response = await axios.get("/api/tasks");                 
        setTasks(response.data);                                        
      } catch (error) {                                                 
        console.error("Error fetching tasks:", error);                  
      }
    };

    fetchTasks();                                                       
  }, []);                                                               

  // Handle delete task
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`); // Call the API to delete the task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Optimistic UI update
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Your Tasks</h1>
        <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
          <Link href="/todos/new">New Task</Link>
        </Button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-white">No tasks available.</p>
      ) : (
        <ul className="space-y-4 max-w-xl mx-auto">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <div>
                <h2 className="text-xl font-bold text-teal-600">{task.title}</h2>
                <p className="text-gray-700">{task.description}</p>

                {task.dueDate && (
                  <p className="text-gray-500">
                    Due Date: {new Date(task.dueDate).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Delete Button */}
              <Button
                className="bg-red-500 hover:bg-red-600 text-white mt-4"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;
