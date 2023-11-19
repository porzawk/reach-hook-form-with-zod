import "./App.css";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

type FormInput = {
  name: string;
  age?: string;
};

function App() {
  const [requireAge, setRequireAge] = useState(true);

  const formSchema = z.object({
    name: z.string().min(1),
    age: requireAge ? z.string().min(1) : z.string().optional(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormInput) {
    console.log("values:", values);
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-black font-bold underline">Example form</h1>
      <label className="relative inline-flex items-center mb-5 cursor-pointer mt-2">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={requireAge}
          onChange={() => {
            setRequireAge(!requireAge);
          }}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          Require Age
        </span>
      </label>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <input
                type="text"
                placeholder="Name"
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-base"
                value={value}
                onChange={onChange}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </>
          )}
          name="name"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <input
                type="text"
                placeholder="Age"
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-base"
                value={value}
                onChange={onChange}
                disabled={!requireAge} // Disable the input when not required
              />
              {errors.age && (
                <span className="text-red-500">{errors.age.message}</span>
              )}
            </>
          )}
          name="age"
        />

        <button
          type="submit"
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
