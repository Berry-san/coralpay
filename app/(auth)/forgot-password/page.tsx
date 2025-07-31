"use client";

import { useLoginMutation } from "@/app/queryHandler/mutation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slice/userService/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormData } from "../../../types/index";
import { ForgotPasswordFormSchema } from "./validations";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { mutate: loginMutation, data } = useLoginMutation();
  const dispatch = useAppDispatch();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log(data);
    router.push("/dashboard");
    dispatch(
      setUser({
        email: form.getValues("email"),
      })
    );
  };
  return (
    <div className="flex flex-col items-center w-full">
      <Image
        src="/images/auth-avatar.png"
        alt="logo"
        width={100}
        height={100}
      />
      <h1 className="text-2xl font-bold mt-4">Forgot Password?</h1>
      <p className="text-sm text-gray-500">
        Please enter your email to get a password reset link.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter Email Address"
                    {...field}
                    className="border-b w-full border-text-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full rounded-xl h-12 text-white" type="submit">
            Request Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
