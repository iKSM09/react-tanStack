import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Header1 } from "./Header.component";
import { useId } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),
  channel: z.string().nonempty("Channel is required"),
});

const labelClass = "block text-sm font-medium leading-6 text-gray-900";
const inputClass =
  "mb-1 mt-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
const errorClass = "text-sm text-red-600";

export const MyFormZod = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="w-96">
      <Header1>Form with Zod</Header1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="my-4">
          <label htmlFor="username" className={labelClass}>
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className={inputClass}
          />
          <p className={errorClass}>{errors.username?.message}</p>
        </div>

        <div className="my-4">
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={inputClass}
          />
          <p className={errorClass}>{errors.email?.message}</p>
        </div>

        <div className="my-4">
          <label htmlFor="channel" className={labelClass}>
            Channel
          </label>
          <input
            type="text"
            id="channel"
            {...register("channel")}
            className={inputClass}
          />
          <p className={errorClass}>{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};
