// THIS IS THE TASKS LISTING PAGE.

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";

interface Task {                                                              // Define Task interface for type-checking task data structure
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  category?: string;
  isEditing?: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);                             // State for task list
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");          // Sort order state
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);  // Category filter state

  
  useEffect(() => {                                                           // Fetch tasks when component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");                       // Fetch tasks from API
        setTasks(response.data);                                              // Set fetched tasks to state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);


  const handleUpdate = async (id: number, updatedTask: Partial<Task>) => {    // Update task data on server
    try {
      await axios.put(`/api/tasks/${id}`, updatedTask);                       // Send updated task to server
    } catch (error: any) {
      console.error("Failed to update task:", error.response?.data || error.message);
    }
  };
  
  const toggleEditMode = (id: number) => {                                    // Toggle edit mode for a specific task
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  
  const handleDelete = async (id: number) => {                                // Delete task from server and update state
    try {
      await axios.delete(`/api/tasks/${id}`);                                 // Send delete request to server
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));    // Remove deleted task from state
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  
  const sortedTasks = tasks.sort((a, b) => {                                   // Sort tasks by due date based on sortOrder
    const dateA = new Date(a.dueDate || "").getTime();
    const dateB = new Date(b.dueDate || "").getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  
  const filteredTasks = sortedTasks.filter((task) =>                          // Filter tasks based on category
    categoryFilter ? task.category === categoryFilter : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Your Tasks</h1>
        <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
          <Link href="/todos/new">New Task</Link>
        </Button>
      </div>
      <div className="flex-col space-y-4">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort by Date ({sortOrder === "asc" ? "Oldest" : "Newest"})
        </Button>
        <div className="flex space-x-2">
          <Button onClick={() => setCategoryFilter(null)}>All</Button>
          <Button onClick={() => setCategoryFilter("Work")}>Work</Button>
          <Button onClick={() => setCategoryFilter("Personal")}>Personal</Button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-white">No tasks available.</p>
      ) : (
        <ul className="space-y-4 max-w-xl mx-auto">
          {filteredTasks.map((task) => (
            <li key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              {task.isEditing ? (
                <>
                  {/* Editable title */}
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id ? { ...t, title: e.target.value } : t
                        )
                      )
                    }
                    className="block w-full border rounded-md p-2 mb-2"
                  />
                  {/* Editable description */}
                  <textarea
                    value={task.description}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id ? { ...t, description: e.target.value } : t
                        )
                      )
                    }
                    className="block w-full border rounded-md p-2 mb-2"
                  />
                  {/* Editable due date */}
                  <input
                    type="datetime-local"
                    value={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id ? { ...t, dueDate: e.target.value } : t
                        )
                      )
                    }
                    className="block w-full border rounded-md p-2 mb-2"
                  />
                  {/* Editable category */}
                  <select
                    value={task.category || ""}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id ? { ...t, category: e.target.value } : t
                        )
                      )
                    }
                    className="block w-full border rounded-md p-2 mb-2"
                  >
                    <option value="">Select a category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                  </select>
                </>
              ) : (
                <>
                  {/* Display task details */}
                  <h2 className="text-xl font-bold text-teal-600">{task.title}</h2>
                  <p className="text-gray-700">{task.description}</p>
                  {task.dueDate && (
                    <p className="text-gray-500">
                      Due Date: {new Date(task.dueDate).toLocaleString()}
                    </p>
                  )}
                  {task.category && <p className="text-gray-500">Category: {task.category}</p>}
                </>
              )}

              {/* Edit and Delete Buttons */}
              <div className="flex space-x-2 mt-4">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    if (task.isEditing) {
                      handleUpdate(task.id, {
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate,
                        category: task.category,
                      });
                    }
                    toggleEditMode(task.id);
                  }}
                >
                  {task.isEditing ? "Save" : "Edit"}
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;




