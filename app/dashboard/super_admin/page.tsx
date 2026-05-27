"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCog,
  Bell,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SuperAdminDashboard() {
  const router = useRouter();

  const [studentCount, setStudentCount] =
    useState(0);

  const [employeeCount, setEmployeeCount] =
    useState(0);

  const [adminCount, setAdminCount] =
    useState(0);

  const [noticeCount, setNoticeCount] =
  useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        // Students count
        const {
          count: students,
        } = await supabase
          .from("students")
          .select("*", {
            count: "exact",
            head: true,
          });

        // Employees count
        const {
          count: employees,
        } = await supabase
          .from("employees")
          .select("*", {
            count: "exact",
            head: true,
          });

        // Admin count
        const {
          count: admins,
        } = await supabase
          .from("admin_users")
          .select("*", {
            count: "exact",
            head: true,
          });

        // Notice count
        const {
          count: notices,
        } = await supabase
          .from("notices")
          .select("*", {
            count: "exact",
            head: true,
          });

        setStudentCount(
          students || 0
        );

        setEmployeeCount(
          employees || 0
        );

        setAdminCount(
          admins || 0
        );

        setNoticeCount(
          notices || 0
        );

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleLogout = () => {
    sessionStorage.removeItem(
      "adminSession"
    );

    router.push("/login");
  };

  const stats = [
    {
      title:
        "Total Students",
      count:
        studentCount,
      icon: Users,
      gradient:
        "from-cyan-500 to-blue-600",
    },
    {
      title:
        "Employees",
      count:
        employeeCount,
      icon: UserCog,
      gradient:
        "from-green-500 to-emerald-700",
    },

      {
        title:
          "Notices",
        count:
          noticeCount,
        icon: Bell,
        gradient:
          "from-orange-500 to-red-600",
      },

    {
      title:
        "Admins",
      count:
        adminCount,
      icon:
        ShieldCheck,
      gradient:
        "from-purple-600 to-pink-600",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-[30px] p-10 shadow-2xl flex justify-between items-center text-white">

  <div className="flex items-center gap-8">

    {/* Admin Placeholder Icon */}
    <div className="w-36 h-36 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg">

      <ShieldCheck
        size={70}
        className="text-white"
      />
    </div>

    {/* Admin Info */}
    <div>
      <h1 className="text-6xl font-bold">
        Admin Dashboard
      </h1>

      <p className="text-2xl mt-3 text-blue-100">
        Welcome back,{" "}
        {
          JSON.parse(
            sessionStorage.getItem(
              "adminSession"
            ) || "{}"
          ).full_name
        }
      </p>

      <div className="mt-5 text-lg text-blue-100 space-y-1">

        <p>
          <span className="font-semibold">
            Admin ID:
          </span>{" "}
          ADM-
{
  String(
    JSON.parse(
      sessionStorage.getItem(
        "adminSession"
      ) || "{}"
    ).id
  ).slice(0, 6)
}
        </p>

        <p>
          <span className="font-semibold">
            Email:
          </span>{" "}
          {
            JSON.parse(
              sessionStorage.getItem(
                "adminSession"
              ) || "{}"
            ).email
          }
        </p>

        <p>
          <span className="font-semibold">
            Role:
          </span>{" "}
          {
            JSON.parse(
              sessionStorage.getItem(
                "adminSession"
              ) || "{}"
            ).role
          }
        </p>

      </div>
    </div>
  </div>

  {/* Logout Button */}
  {/* Right Side Buttons */}
<div className="flex items-center gap-4">

  {/* Add Admin Button */}
  <button
    onClick={() =>
      router.push(
        "/dashboard/super_admin/admins"
      )
    }
    className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl text-xl font-semibold shadow-lg"
  >
    + Add Admin
  </button>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 transition px-8 py-4 rounded-2xl flex items-center gap-3 text-xl font-semibold shadow-lg"
  >
    <LogOut size={24} />
    Logout
  </button>
</div>
</div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

        {stats.map(
          (
            item,
            index
          ) => {
            const Icon =
              item.icon;

            return (
              <div
                key={
                  index
                }
                className={`bg-gradient-to-r ${item.gradient} rounded-[30px] shadow-xl p-8 text-white flex justify-between items-center hover:scale-105 transition`}
              >
                <div>
                  <h2 className="text-2xl font-semibold">
                    {
                      item.title
                    }
                  </h2>

                  <p className="text-6xl font-bold mt-5">
                    {loading
                      ? "..."
                      : item.count}
                  </p>
                </div>

                <Icon
                  size={
                    70
                  }
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}