"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewTaskpage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Enter your task ..."></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Task</Button>

    </div>
  );
};

export default NewTaskpage;
