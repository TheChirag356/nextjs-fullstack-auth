"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 text-center">
      <h1>Profile Page</h1>
      <hr />
      <p className="text-4xl">
        Profile Page{" "}
        <span className="rounded-xl ml-2 p-2 bg-orange-500 text-black">
          {id}
        </span>
      </p>
      <Button className="mt-4" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
