"use client";

//THIS IS MY TASK SUBMISSION PAGE.

import { Button, TextField, Callout, Text, Theme } from "@radix-ui/themes";
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
      await axios.post("/api/tasks", data);
      router.push("/todos");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  // Set default value for the date-time input to the current time
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
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

          {/* HTML Date/Time Picker with Default Value */}
          <label className="text-white">Due Date and Time:</label>
          <input
            type="datetime-local"
            {...register("dueDate")}
            className="w-full p-2 rounded-md"
            defaultValue={getCurrentDateTime()} // Set default to current time
          />
          <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

          <Button disabled={isSubmitting}>
            Submit New Task {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Theme>
    </div>
  );
};

export default NewTaskPage;


