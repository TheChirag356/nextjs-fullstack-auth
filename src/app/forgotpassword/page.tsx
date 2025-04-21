"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordPage() {
  const router = useRouter();

  const forgotPassword = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.promise(axios.post("/api/users/forgotpassword", values), {
        loading: "Loading ...",
        success: "Check your email for the reset link",
        error: "Error sending reset link",
      });
    } catch (error: any) {
      console.log("Forgot Password Failed", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 text-center">
      <h1 className="font-bold text-4xl mb-8">Forgot Password</h1>
      <div className="w-1/5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(forgotPassword)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Password</Button>
          </form>
        </Form>
        <div className="mt-4">
          Go back to the{" "}
          <Link href="/login" className="text-blue-500">
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}
