"use client";

import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTasksSchema } from "@/app/validationSchemas";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type TaskForm = z.infer<typeof createTasksSchema>;

const NewTaskpage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<TaskForm>({
    resolver: zodResolver(createTasksSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
        )}

      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/tasks", data);
            router.push("/todos");
          } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occurred.');
          }
        })}
        >
        <TextField.Root
          placeholder="Enter your task ..."
          {...register("title")}>
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
          />
          <ErrorMessage>
          {errors.description?.message}
          </ErrorMessage> 

        <Button disabled={isSubmitting}>
          Submit New Task {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewTaskpage;


