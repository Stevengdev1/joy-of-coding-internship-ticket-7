/* eslint-disable @next/next/no-img-element */
"use client"; 

// This is the HOME PAGE.
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/todos/new"); // This navigates to the new task page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 flex flex-col items-center justify-center">
      {/* White welcome window */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl text-center space-y-4 mt-12">
        <h1 className="text-5xl font-extrabold text-teal-600">
          WELCOME TO TASK TASKER!
        </h1>
        <p className="text-gray-700">
          Simply create tasks, manage your day, and stay organized!
        </p>

        {/* Get Started Button */}
        <button
          onClick={handleNavigate}
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded-full shadow-md transition-all"
        >
          Get Started
        </button>
      </div>
      <div className="w-full max-w-4xl mt-8 p-4">
        <img
          src="/images/to_do_img_2.jpg"
          alt="Task Management"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}


