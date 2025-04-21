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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  email: z.string().email(),
});

export default function SignupPage() {
  const router = useRouter();

  const onSignup = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.promise(axios.post("/api/users/signup", values), {
        loading: "Creating user...",
        success: "User created successfully",
        error: "Error creating user",
      });

      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 text-center">
      <h1 className="font-bold text-4xl mb-8">Signup</h1>
      <div className="w-1/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignup)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          Already have an account? <Link className="text-blue-500" href="/login">Login Here</Link>
        </div>
      </div>
    </div>
  );
}
