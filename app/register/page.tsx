"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SECURITY CHECK
useEffect(() => {
  const adminSession =
  sessionStorage.getItem(
    "adminSession"
  );

  const role =
    sessionStorage.getItem(
      "adminRole"
    );

  console.log(
  "adminSession:",
  adminSession
);

  console.log(
    "role:",
    role
  );

  // wait until session exists
  if (
  adminSession === null
) {
  router.replace(
    "/login"
  );

  return;
}

  // not super admin
  if (
    role !==
    "super_admin"
  ) {
    alert(
      "Only super admin can create admins"
    );

    router.replace(
      "/dashboard"
    );
  }
}, [router]);

  const handleRegister =
    async () => {
      try {
        setLoading(true);

        // Strong password validation
        const strongPassword =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (
          !strongPassword.test(
            password
          )
        ) {
          alert(
            "Password must contain uppercase, lowercase, number, special character and minimum 8 characters."
          );
          return;
        }

        // Username exists?
        const {
          data:
            existingAdmin,
        } =
          await supabase
            .from(
              "admin_users"
            )
            .select("*")
            .eq(
              "username",
              username
            )
            .single();

        if (
          existingAdmin
        ) {
          alert(
            "Username already exists"
          );
          return;
        }

        // HASH PASSWORD
        const hashedPassword =
          await bcrypt.hash(
            password,
            10
          );

        // Save admin
        const { error } =
          await supabase
            .from(
              "admin_users"
            )
            .insert([
              {
                username,
                email,
                password:
                  hashedPassword,
                role:
                  "admin",
              },
            ]);

        if (error) {
          console.log(
            error
          );

          alert(
            "Registration failed"
          );

          return;
        }

        alert(
          "Admin created successfully"
        );

        router.push(
          "/dashboard"
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Create Admin
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Strong Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={
              handleRegister
            }
            disabled={
              loading
            }
            className="w-full bg-blue-900 text-white py-3 rounded-lg"
          >
            {loading
              ? "Creating..."
              : "Create Admin"}
          </button>

        </div>
      </div>
    </div>
  );
}