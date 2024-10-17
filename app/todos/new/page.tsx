"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface TaskForm {
  title: string;
  description: string;
}

const NewTaskpage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<TaskForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/tasks", data);
        router.push("/todos");
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
  );
};

export default NewTaskpage;
