"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me");
    console.log(res.data.data._id);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-30 mx-auto flex w-full max-w-2xl overflow-y-auto items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center min-h-screen p-2">
        <h1>Profile Page</h1>
        <hr />
        <h2>
          {data === "nothing" ? "No Data Right Now" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
        <hr />
        <button onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          logout
        </button>
        <button onClick={getUserDetails}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
