//THIS IS THE TASK SUBMISSION PAGE.
"use client";

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

type TaskForm = z.infer<typeof createTasksSchema>;

const NewTaskPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TaskForm>({
    resolver: zodResolver(createTasksSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      setError(''); // Clear any previous error

      const response = await axios.post("/api/tasks", data);

      if (response.status === 201) {
        router.push("/todos");
      } else {
        const errorData = response.data;
        console.error("Error:", errorData);
        setError(errorData?.error || "Failed to create task.");
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 flex flex-col items-center justify-center">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Theme accentColor="teal" radius="full">
        <form className="space-y-3" onSubmit={onSubmit}>
          <TextField.Root placeholder="Enter your task ..." {...register("title")} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <label className="text-white">Due Date and Time:</label>
          <input
            type="datetime-local"
            {...register("dueDate")}
            className="w-full p-2 rounded-md"
            defaultValue={getCurrentDateTime()}
          />
          <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

          <label className="text-white">Category:</label>
          <select {...register("category")} className="w-full p-2 rounded-md">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>

          <Button disabled={isSubmitting}>
            Submit New Task {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Theme>
    </div>
  );
};

export default NewTaskPage;
