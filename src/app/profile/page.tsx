"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
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

  const [data, setData] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.user._id);
        console.log(res.data.user._id)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 text-center">
      <h1>Profile Page</h1>
      <h2>{data ? <Link href={`/profile/${data}`}>Redirect to your profile</Link> : ""}</h2>
      <Button className="mt-4" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
