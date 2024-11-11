// //THIS IS THE TASK SUBMISSION PAGE.
// "use client";

// import { Button, TextField, Callout, Theme } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import "easymde/dist/easymde.min.css";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createTasksSchema } from "@/app/validationSchemas";
// import { z } from "zod";
// import ErrorMessage from "@/app/components/ErrorMessage";
// import Spinner from "@/app/components/Spinner";

// type TaskForm = z.infer<typeof createTasksSchema>;

// const NewTaskPage = () => {
//   const router = useRouter();
//   const { register, control, handleSubmit, formState: { errors } } = useForm<TaskForm>({
//     resolver: zodResolver(createTasksSchema),
//   });
//   const [error, setError] = useState('');
//   const [isSubmitting, setSubmitting] = useState(false);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setSubmitting(true);
//       setError(''); // Clear any previous error

//       const response = await axios.post("/api/tasks", data);

//       if (response.status === 201) {
//         router.push("/todos");
//       } else {
//         const errorData = response.data;
//         console.error("Error:", errorData);
//         setError(errorData?.error || "Failed to create task.");
//       }
//     } catch (error: any) {
//       console.error("Unexpected error:", error);
//       const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
//       setError(errorMessage);
//     } finally {
//       setSubmitting(false);
//     }
//   });

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 16);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 flex flex-col items-center justify-center">
//       {error && (
//         <Callout.Root color="red" className="mb-5">
//           <Callout.Text>{error}</Callout.Text>
//         </Callout.Root>
//       )}
//       <Theme accentColor="teal" radius="full">
//         <form className="space-y-3" onSubmit={onSubmit}>
//           <TextField.Root placeholder="Enter your task ..." {...register("title")} />
//           <ErrorMessage>{errors.title?.message}</ErrorMessage>

//           <Controller
//             name="description"
//             control={control}
//             render={({ field }) => (
//               <SimpleMDE placeholder="Description" {...field} />
//             )}
//           />
//           <ErrorMessage>{errors.description?.message}</ErrorMessage>

//           <label className="text-white">Due Date and Time:</label>
//           <input
//             type="datetime-local"
//             {...register("dueDate")}
//             className="w-full p-2 rounded-md"
//             defaultValue={getCurrentDateTime()}
//           />
//           <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

//           <label className="text-white">Category:</label>
//           <select {...register("category")} className="w-full p-2 rounded-md">
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//           </select>
//           <ErrorMessage>{errors.category?.message}</ErrorMessage>

//           <Button disabled={isSubmitting}>
//             Submit New Task {isSubmitting && <Spinner />}
//           </Button>
//         </form>
//       </Theme>
//     </div>
//   );
// };

// export default NewTaskPage;

// THIS IS THE TASK SUBMISSION PAGE.
"use client"; // Indicates that this is a client-side component.

import { Button, TextField, Callout, Theme } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTasksSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";


type TaskForm = z.infer<typeof createTasksSchema>;                                          // Infers the TypeScript type from the createTasksSchema for task form.

const NewTaskPage = () => {
  const router = useRouter();                                                               // Initializes the useRouter hook for navigation.
  const { register, control, handleSubmit, formState: { errors } } = useForm<TaskForm>({    // Initializes the form using react-hook-form with Zod validation.
    resolver: zodResolver(createTasksSchema),                                               // Resolves Zod validation for the form.
  });
  const [error, setError] = useState('');                                                   // Initializes state to hold error messages.
  const [isSubmitting, setSubmitting] = useState(false);                                    // Initializes state to track if the form is currently being submitted.
  const onSubmit = handleSubmit(async (data) => {                                           // Defines the form submission handler.
    try {
      setSubmitting(true);                                                                  // Sets the submitting state to true when form submission starts.
      setError('');                                                                         // Clears any previous error messages.
      const response = await axios.post("/api/tasks", data);                                // Sends a POST request to the API with form data.
      if (response.status === 201) {                                                        // Checks if the response status is 201 (Created).
        router.push("/todos");                                                              // Redirects to the task listing page upon successful task creation.
      } else {
        const errorData = response.data;                                                    // Extracts error data from the response.
        console.error("Error:", errorData);                                                 // Logs error data to the console.
        setError(errorData?.error || "Failed to create task.");                             // Sets the error message state.
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);                                            // Logs any unexpected error that occurs during submission.
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";  // Extracts error message or uses a default message.
      setError(errorMessage);                                                               // Sets the error message state.
    } finally {
      setSubmitting(false);                                                                 // Resets the submitting state after the request completes.
    }
  });
  const getCurrentDateTime = () => {                                                        // Helper function that gets current date & time in ISO format for due date.
    const now = new Date();
    return now.toISOString().slice(0, 16);                                                  // Returns the current date and time formatted for the input field.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 flex flex-col items-center justify-center">
      {error && (                                                                           // Displays an error message if an error exists.
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text> 
        </Callout.Root>)}
      <Theme accentColor="teal" radius="full">                                              {/* Radix UI theme customization */}
        <form className="space-y-3" onSubmit={onSubmit}>                                    {/* Form with some margin spacing between elements */}
          <TextField.Root placeholder="Enter your task ..." {...register("title")} />       {/* Text input field for task title */}
          <ErrorMessage>{errors.title?.message}</ErrorMessage>                              {/* Displays error message for title field */}
          <Controller
            name="description"                                                              // Controller for the task description input field
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />                            // SimpleMDE editor for task description
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>                        {/* Displays error message for description field */}

          <label className="text-white">Due Date and Time:</label>                        {/* Label for the due date input */}
          <input
            type="datetime-local"                                                           // Input for selecting date and time
            {...register("dueDate")}                                                        // Registers the due date input with react-hook-form
            className="w-full p-2 rounded-md"                                               // Styles the input field
            defaultValue={getCurrentDateTime()}                                             // Sets the default value to the current date and time
          />
          <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>                            {/* Displays error message for due date field */}

          <label className="text-white">Category:</label>                                 {/* Label for the category input */}
          <select {...register("category")} className="w-full p-2 rounded-md">              {/* Dropdown for selecting task category */}
            <option value="Work">Work</option>                                              {/* Option for Work category */}
            <option value="Personal">Personal</option>                                      {/* Option for Personal category */}
          </select>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>                           {/* Displays error message for category field */}

          <Button disabled={isSubmitting}>                                                  {/* Submit button, disabled while submitting */}
            Submit New Task {isSubmitting && <Spinner />}                                   {/* Shows the spinner when the form is being submitted */}
          </Button>
        </form>
      </Theme>
    </div>
  );
};

export default NewTaskPage; 
