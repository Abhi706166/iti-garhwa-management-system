"use client";

import bcrypt from "bcryptjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async () => {
      try {
        setLoading(true);

        // Validation
        if (
          !email ||
          !username ||
          !password
        ) {
          alert(
            "Email, ID and Password are required"
          );
          return;
        }

        // Find admin user
        const {
          data,
          error,
        } = await supabase
          .from("admin_users")
          .select("*")
          .eq(
            "email",
            email.trim()
          )
          .eq(
            "username",
            username.trim()
          )
          .single();

        if (
          error ||
          !data
        ) {
          alert(
            "Invalid Email or ID"
          );
          return;
        }

        // Compare password
        const isPasswordCorrect =
          await bcrypt.compare(
            password,
            data.password
          );

        if (
          !isPasswordCorrect
        ) {
          alert(
            "Wrong password"
          );
          return;
        }

        // Save session
       sessionStorage.setItem(
  "adminSession",
  JSON.stringify({
    id: data.id,
    username:
      data.username,
    full_name:
      data.full_name,
    email:
      data.email,
    role:
      data.role,
    loginTime:
      Date.now(),
  })
);

        // Redirect based on role
        if (
          data.role ===
          "super_admin"
        ) {
          router.push(
            "/dashboard/super_admin"
          );
        } else if (
          data.role ===
          "admin"
        ) {
          router.push(
            "/dashboard"
          );
        } else {
          alert(
            "Invalid role assigned"
          );
        }
      } catch (
        error
      ) {
        console.log(
          error
        );

        alert(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900">
            Login
          </h1>

          <p className="text-gray-500 mt-2">
            Login to access dashboard
          </p>
        </div>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="Admin ID / Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg outline-none"
          />

          <button
            onClick={
              handleLogin
            }
            disabled={
              loading
            }
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </div>
      </div>
    </div>
  );
}