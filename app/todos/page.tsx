// "use client";

// // THIS IS MY TASKS LISTING PAGE.

// import React, { useEffect, useState } from "react";
// import { Button } from "@radix-ui/themes";
// import Link from "next/link";
// import axios from "axios";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   dueDate: string | null;
//   isEditing?: boolean; // Optional state to track edit mode
// }

// const TasksPage = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   // Fetch tasks when the component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("/api/tasks");
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Handle task update
//   const handleUpdate = async (id: number, updatedTask: Partial<Task>) => {
//     try {
//       await axios.put(`/api/tasks/${id}`, updatedTask);
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
//       );
//     } catch (error) {
//       console.error("Failed to update task:", error);
//     }
//   };

//   // Toggle edit mode for a specific task
//   const toggleEditMode = (id: number) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === id ? { ...task, isEditing: !task.isEditing } : task
//       )
//     );
//   };

//   // Handle task deletion
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/tasks/${id}`);
//       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-white">Your Tasks</h1>
//         <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
//           <Link href="/todos/new">New Task</Link>
//         </Button>
//       </div>

//       {tasks.length === 0 ? (
//         <p className="text-center text-white">No tasks available.</p>
//       ) : (
//         <ul className="space-y-4 max-w-xl mx-auto">
//           {tasks.map((task) => (
//             <li key={task.id} className="bg-white p-4 rounded-lg shadow-md">
//               {task.isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     value={task.title}
//                     onChange={(e) =>
//                       setTasks((prevTasks) =>
//                         prevTasks.map((t) =>
//                           t.id === task.id ? { ...t, title: e.target.value } : t
//                         )
//                       )
//                     }
//                     className="block w-full border rounded-md p-2 mb-2"
//                   />
//                   <textarea
//                     value={task.description}
//                     onChange={(e) =>
//                       setTasks((prevTasks) =>
//                         prevTasks.map((t) =>
//                           t.id === task.id ? { ...t, description: e.target.value } : t
//                         )
//                       )
//                     }
//                     className="block w-full border rounded-md p-2 mb-2"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-xl font-bold text-teal-600">{task.title}</h2>
//                   <p className="text-gray-700">{task.description}</p>
//                 </>
//               )}

//               {task.dueDate && (
//                 <p className="text-gray-500">
//                   Due Date: {new Date(task.dueDate).toLocaleString()}
//                 </p>
//               )}

//               <div className="flex space-x-2 mt-4">
//                 <Button
//                   className="bg-blue-500 hover:bg-blue-600 text-white"
//                   onClick={() => {
//                     if (task.isEditing) {
//                       handleUpdate(task.id, { title: task.title, description: task.description });
//                     }
//                     toggleEditMode(task.id);
//                   }}
//                 >
//                   {task.isEditing ? "Save" : "Edit"}
//                 </Button>
//                 <Button
//                   className="bg-red-500 hover:bg-red-600 text-white"
//                   onClick={() => handleDelete(task.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TasksPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import { Button } from "@radix-ui/themes";
// import Link from "next/link";
// import axios from "axios";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   dueDate: string | null;
//   category?: string; // Optional category field
//   isEditing?: boolean;
// }

// const TasksPage = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [category, setCategory] = useState<string | null>(null);

//   // Fetch tasks when the component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("/api/tasks");
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Handle task update
//   const handleUpdate = async (id: number, updatedTask: Partial<Task>) => {
//     try {
//       await axios.put(`/api/tasks/${id}`, updatedTask);
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
//       );
//     } catch (error) {
//       console.error("Failed to update task:", error);
//     }
//   };

//   // Toggle edit mode
//   const toggleEditMode = (id: number) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === id ? { ...task, isEditing: !task.isEditing } : task
//       )
//     );
//   };

//   // Handle task deletion
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/tasks/${id}`);
//       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   };

//   // Sorting logic by due date
//   const sortedTasks = tasks.sort((a, b) => {
//     const dateA = new Date(a.dueDate || "").getTime();
//     const dateB = new Date(b.dueDate || "").getTime();
//     return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//   });

//   // Filtering by category
//   const filteredTasks = sortedTasks.filter((task) =>
//     category ? task.category === category : true
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-white">Your Tasks</h1>
//         <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
//           <Link href="/todos/new">New Task</Link>
//         </Button>
//       </div>

//       {/* Sorting Button */}
//       <Button
//         className="bg-green-500 hover:bg-green-600 text-white mb-4"
//         onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//       >
//         Sort by Date ({sortOrder === "asc" ? "Oldest" : "Newest"})
//       </Button>

//       {/* Filtering Buttons */}
//       <div className="flex space-x-2 mb-4">
//         <Button onClick={() => setCategory(null)}>All</Button>
//         <Button onClick={() => setCategory("Work")}>Work</Button>
//         <Button onClick={() => setCategory("Personal")}>Personal</Button>
//       </div>

//       {filteredTasks.length === 0 ? (
//         <p className="text-center text-white">No tasks available.</p>
//       ) : (
//         <ul className="space-y-4 max-w-xl mx-auto">
//           {filteredTasks.map((task) => (
//             <li key={task.id} className="bg-white p-4 rounded-lg shadow-md">
//               {task.isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     value={task.title}
//                     onChange={(e) =>
//                       setTasks((prevTasks) =>
//                         prevTasks.map((t) =>
//                           t.id === task.id ? { ...t, title: e.target.value } : t
//                         )
//                       )
//                     }
//                     className="block w-full border rounded-md p-2 mb-2"
//                   />
//                   <textarea
//                     value={task.description}
//                     onChange={(e) =>
//                       setTasks((prevTasks) =>
//                         prevTasks.map((t) =>
//                           t.id === task.id ? { ...t, description: e.target.value } : t
//                         )
//                       )
//                     }
//                     className="block w-full border rounded-md p-2 mb-2"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-xl font-bold text-teal-600">{task.title}</h2>
//                   <p className="text-gray-700">{task.description}</p>
//                 </>
//               )}

//               {task.dueDate && (
//                 <p className="text-gray-500">
//                   Due Date: {new Date(task.dueDate).toLocaleString()}
//                 </p>
//               )}

//               <div className="flex space-x-2 mt-4">
//                 <Button
//                   className="bg-blue-500 hover:bg-blue-600 text-white"
//                   onClick={() => {
//                     if (task.isEditing) {
//                       handleUpdate(task.id, {
//                         title: task.title,
//                         description: task.description,
//                       });
//                     }
//                     toggleEditMode(task.id);
//                   }}
//                 >
//                   {task.isEditing ? "Save" : "Edit"}
//                 </Button>
//                 <Button
//                   className="bg-red-500 hover:bg-red-600 text-white"
//                   onClick={() => handleDelete(task.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TasksPage;

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  category?: string; // Optional category field
  isEditing?: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Fetch tasks when the component mounts
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

  // Handle task update
  const handleUpdate = async (id: number, updatedTask: Partial<Task>) => {
    try {
      await axios.put(`/api/tasks/${id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Toggle edit mode
  const toggleEditMode = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  // Handle task deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Sorting logic by due date
  const sortedTasks = tasks.sort((a, b) => {
    const dateA = new Date(a.dueDate || "").getTime();
    const dateB = new Date(b.dueDate || "").getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Apply the category filter
  const filteredTasks = sortedTasks.filter((task) =>
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
      {/* Sorting Button */}
      <Button
        className="bg-green-500 hover:bg-green-600 text-white"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
        Sort by Date ({sortOrder === "asc" ? "Oldest" : "Newest"})
      </Button>

      {/* Filtering Buttons */}
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
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-teal-600">{task.title}</h2>
                  <p className="text-gray-700">{task.description}</p>
                </>
              )}

              {task.dueDate && (
                <p className="text-gray-500">
                  Due Date: {new Date(task.dueDate).toLocaleString()}
                </p>
              )}

              <div className="flex space-x-2 mt-4">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    if (task.isEditing) {
                      handleUpdate(task.id, {
                        title: task.title,
                        description: task.description,
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
