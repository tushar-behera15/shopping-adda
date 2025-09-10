"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const router= useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("User register successfully!");
      router.push("/")
    } else {
      toast.error(data.error || "OTP verification failed");
    }
    setMessage(data.message || data.error);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded shadow-md space-y-4 w-80"
      >
        <h1 className="text-xl font-bold">Verify OTP</h1>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white p-2 rounded"
        >
          Verify
        </button>
        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
