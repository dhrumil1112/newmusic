"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed:", error);
      toast.error(error.message);
    }
    finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 && 
      user.password.length > 0 && 
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="mt-30 mx-auto flex w-full max-w-2xl overflow-y-auto items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center min-h-screen p-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
          type="text" 
          value={user.username} 
          onChange={(e) => setUser({ ...user, username: e.target.value })} 
          id="username" 
          placeholder='username' 
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' 
        />
      
        <label htmlFor="email">email</label>
        <input 
          type="text" 
          value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })} 
          id="email" 
          placeholder='email' 
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' 
        />

        <label htmlFor="password">password</label>
        <input 
          type="password" 
          value={user.password} 
          onChange={(e) => setUser({ ...user, password: e.target.value })} 
          id="password" 
          placeholder='password' 
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' 
        />

        <button 
          onClick={onSignup} 
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-600 disabled:pointer-events-none'>
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
        <Link href="/login" className='text-blue-500 hover:underline'>
          Visit Login Page
        </Link>
      </div>
    </div>
  );
}