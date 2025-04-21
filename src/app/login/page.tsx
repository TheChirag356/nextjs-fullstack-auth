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
  password: z.string().min(8).max(50),
});

export default function LoginPage() {
  const router = useRouter();

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.promise(await axios.post("/api/users/login", values), {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: "Error logging in",
      });

      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 text-center">
      <h1 className="font-bold text-4xl mb-8">Login</h1>
      <div className="w-1/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
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
            <Button type="submit">Login</Button>
          </form>
        </Form>
        <div className="mt-4">
          Forgot your password? <Link href="/forgotpassword" className="text-blue-500">Click Here</Link>
        </div>
        <div className="mt-4">
          Don&apos;t have an account yet? <Link href="/signup" className="text-blue-500">Signup Here</Link>
        </div>
      </div>
    </div>
  );
}
