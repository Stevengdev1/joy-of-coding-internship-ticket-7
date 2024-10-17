"use client";

import { Button, TextField, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TaskForm {
  title: string;
  description: string;
}

const NewTaskpage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<TaskForm>();
  const [error, setError] = useState('');

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
            await axios.post("/api/tasks", data);
            router.push("/todos");
            
          } catch (error) {
            setError('An unexpected error occurred.');
          }
        })}
        >
        <TextField.Root
          placeholder="Enter your task ..."
          {...register("title")}
          ></TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
          />

        <Button>Submit New Task</Button>
      </form>
    </div>
  );
};

export default NewTaskpage;
