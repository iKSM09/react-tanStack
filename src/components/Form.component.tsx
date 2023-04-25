import { FormEvent, ReactNode, useState } from "react";
import { PostType } from "../api/posts";
import Input from "./Input.component";

const Form = (
  { children }: { children: ReactNode },
  handleSubmit: () => void,
  data?: PostType
) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-96 flex justify-center mx-4">
      <Input id={data?.id ?? ""} label="Title" value={data?.title ?? ""} />
      <Input
        id={data?.id ?? ""}
        label="Content"
        value={data?.content ?? ""}
        placeholder="What's on your mind..."
      />
      {children}
    </form>
  );
};

export default Form;
