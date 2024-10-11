"use client";

import { Button, TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import React from "react";

const NewTaskpage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Enter your task ..."></TextField.Root>
      <TextArea placeholder="Reply to comment…" />
      <Button>Submit New Task</Button>

    </div>
  );
};

export default NewTaskpage;
