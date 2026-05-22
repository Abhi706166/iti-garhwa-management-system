"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("");

  const handleLogin = () => {
    if (role === "Admin") {
      router.push("/dashboard/admin");
    } else if (role === "Student") {
      router.push("/dashboard/student");
    } else if (role === "Employee") {
      router.push("/dashboard/employee");
    } else {
      alert("Please select a role");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Government ITI Garhwa
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Student & Employee Management Portal
        </p>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
          <option value="Employee">Employee</option>
        </select>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-5"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}