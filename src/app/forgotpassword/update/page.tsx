"use client";
import Link from "next/link";
import React, { useEffect } from "react";
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

const formSchema = z
  .object({
    newpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50),
    confirmpassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters")
      .max(50),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [token, setToken] = React.useState<string>("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    console.log(token);
  }, []);

  const updatePassword = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.promise(
        axios.put("/api/users/forgotpassword", { ...values, token }),
        {
          loading: "Updating password...",
          success: "Password Updated successfully",
          error: "Error updating password",
        }
      );

      router.push("/login");
    } catch (error: any) {
      console.log("Failed Updating Password", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 text-center">
      <h1 className="font-bold text-4xl mb-8">Update Password</h1>
      <div className="w-1/5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updatePassword)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="newpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update</Button>
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
