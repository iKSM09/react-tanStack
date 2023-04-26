import { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Header1 } from "./Header.component";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const labelClass = "block text-sm font-medium leading-6 text-gray-900";
const inputClass =
  "mb-1 mt-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
const errorClass = "text-sm text-red-600";

const MyForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "John Doe",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } =
    formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  const handleGetValues = () => {
    console.log("Get values", getValues());
  };

  const handleSetValue = () => {
    console.log(
      "Get values",
      setValue("username", "", {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      })
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const watchUsername = watch("username");

  return (
    <div className="w-96">
      <Header1>React Hook Form</Header1>
      <h2>Watched value: {watchUsername}</h2>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="w-full my-4"
      >
        <div className="my-4">
          <label htmlFor="username" className={labelClass}>
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            className={inputClass}
          />
          <p className={errorClass}>{errors.username?.message}</p>
        </div>

        <div className="my-4">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
                },
              },
            })}
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
            {...register("channel", {
              required: "Channel is required",
            })}
            className={inputClass}
          />
          <p className={errorClass}>{errors.channel?.message}</p>
        </div>

        <div className="my-4">
          <label htmlFor="twitter" className={labelClass}>
            Twitter
          </label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter")}
            className={inputClass}
          />
        </div>

        <div className="my-4">
          <label htmlFor="facebook" className={labelClass}>
            Facebook
          </label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook")}
            className={inputClass}
          />
        </div>

        <div className="my-4">
          <label htmlFor="primary-phone" className={labelClass}>
            Primary phone number
          </label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
            className={inputClass}
          />
        </div>

        <div className="my-4">
          <label htmlFor="secondary-phone" className={labelClass}>
            Secondary phone number
          </label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
            className={inputClass}
          />
        </div>

        <div className="my-4">
          <label htmlFor="asdf" className={labelClass}>
            List of phone numbers
          </label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex">
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                    name=""
                    id=""
                    className={inputClass}
                  />
                  {index > 0 && (
                    <button
                      className="m-4"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <div className="my-4">
          <label htmlFor="age" className={labelClass}>
            Age
          </label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
            className={inputClass}
          />
          <p className={errorClass}>{errors.age?.message}</p>
        </div>

        <div className="my-4">
          <label htmlFor="dob" className={labelClass}>
            Date of birth
          </label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Date of birth is required",
            })}
            className={inputClass}
          />
          <p className={errorClass}>{errors.dob?.message}</p>
        </div>

        <div className="flex gap-6">
          <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
            Submit
          </button>
          <button type="button" onClick={() => reset()}>
            Reset
          </button>

          <button type="button" onClick={handleGetValues}>
            Get Values
          </button>
          <button type="button" onClick={handleSetValue}>
            Set Value
          </button>
          <button type="button" onClick={() => trigger("username")}>
            Validate
          </button>
        </div>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default MyForm;
