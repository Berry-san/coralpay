"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
  shortCode: z.string().min(3),
  file: z.any(),
});

export function StepTwo({ setStep, type }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Submitted:", { ...data, type });
    setStep(3); // move to success page
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-medium">Apply for a Short Code</h2>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Upload Letter of Authorization (LOA)
        </label>
        <Input type="file" accept="application/pdf" {...register("file")} />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Enter short code
        </label>
        <Input
          type="text"
          {...register("shortCode")}
          placeholder="*123*2#"
          className="w-full"
        />
      </div>

      <div className="flex justify-between ">
        <Button
          className="bg-[#D5C6DC] text-primary"
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button disabled={!type} type="submit">
          Submit Application
        </Button>
      </div>
    </form>
  );
}
