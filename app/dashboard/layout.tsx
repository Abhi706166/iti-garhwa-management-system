"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useRouter,
  usePathname,
} from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname =
    usePathname();

  const [
    checkingAuth,
    setCheckingAuth,
  ] = useState(true);

  const [role, setRole] =
    useState("");

  useEffect(() => {
    const adminSession =
      sessionStorage.getItem(
        "adminSession"
      );

    if (!adminSession) {
      router.replace(
        "/login"
      );
      return;
    }

    try {
      const session =
        JSON.parse(
          adminSession
        );

      const isExpired =
        Date.now() -
          session.loginTime >
        24 *
          60 *
          60 *
          1000;

      if (isExpired) {
        sessionStorage.removeItem(
          "adminSession"
        );

        router.replace(
          "/login"
        );
        return;
      }

      setRole(
        session.role
      );

      setCheckingAuth(
        false
      );
    } catch {
      sessionStorage.removeItem(
        "adminSession"
      );

      router.replace(
        "/login"
      );
    }
  }, [router]);

  const handleLogout =
    () => {
      sessionStorage.removeItem(
        "adminSession"
      );

      router.push(
        "/login"
      );
    };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-white" />
    );
  }

  // ROLE BASED ROUTES
  const dashboardPath =
    role ===
    "super_admin"
      ? "/dashboard/super_admin"
      : "/dashboard";

  const studentsPath =
    role ===
    "super_admin"
      ? "/dashboard/super_admin/students"
      : "/dashboard/student";

  const employeesPath =
    role ===
    "super_admin"
      ? "/dashboard/super_admin/employees"
      : "/dashboard/employee";

  const noticesPath =
    role ===
    "super_admin"
      ? "/dashboard/super_admin/notices"
      : "/dashboard/notices";

  const tradesPath =
    role ===
    "super_admin"
      ? "/dashboard/super_admin/trades"
      : "/dashboard/trades";

  // HIDE SIDEBAR
  const noSidebarPages =
    pathname.includes(
      "/dashboard/student"
    ) ||
    pathname.includes(
      "/dashboard/employee"
    ) ||
    pathname.includes(
      "/dashboard/notices"
    ) ||
    pathname.includes(
      "/dashboard/trades"
    ) ||
    pathname.includes(
      "/dashboard/super_admin/students"
    ) ||
    pathname.includes(
      "/dashboard/super_admin/employees"
    ) ||
    pathname.includes(
      "/dashboard/super_admin/notices"
    ) ||
    pathname.includes(
      "/dashboard/super_admin/trades"
    );

  if (
    noSidebarPages
  ) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-blue-900 text-white p-6 flex flex-col shadow-xl">

        <h1 className="text-4xl font-bold mb-10">
          ITI Garhwa
        </h1>

        <nav className="space-y-4 flex-1">

          <Link
            href={
              dashboardPath
            }
            className={`block px-5 py-4 rounded-xl text-lg transition ${
              pathname ===
              dashboardPath
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href={
              studentsPath
            }
            className={`block px-5 py-4 rounded-xl text-lg transition ${
              pathname.includes(
                "student"
              )
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}
          >
            Students
          </Link>

          <Link
            href={
              employeesPath
            }
            className={`block px-5 py-4 rounded-xl text-lg transition ${
              pathname.includes(
                "employee"
              )
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}
          >
            Employees
          </Link>

          <Link
            href={
              noticesPath
            }
            className={`block px-5 py-4 rounded-xl text-lg transition ${
              pathname.includes(
                "notices"
              )
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}
          >
            Notices
          </Link>

          <Link
            href={
              tradesPath
            }
            className={`block px-5 py-4 rounded-xl text-lg transition ${
              pathname.includes(
                "trades"
              )
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}
          >
            Trades
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}