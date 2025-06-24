"use client";

import React from "react";

export default function page({ params }: any) {
  return (
    <div className="mt-30 mx-auto flex w-full max-w-2xl overflow-y-auto items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center min-h-screen p-2">
        <h1>Profile Page</h1>
        <h2 className="p-3 bg-green-500 text-black rounded">{params.id}</h2>
      </div>
    </div>
  );
}
