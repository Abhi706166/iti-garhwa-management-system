"use client";
import bcrypt from "bcryptjs";
import {
  useState,
  useEffect,
} from "react";
import {
  Plus,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminsPage() {
  const [admins, setAdmins] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({
      full_name: "",
      username: "",
      email: "",
      password: "",
    });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins =
    async () => {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase
        .from(
          "admin_users"
        )
        .select("*")
        .order(
          "created_at",
          {
            ascending:
              false,
          }
        );

      if (!error) {
        setAdmins(
          data || []
        );
      }

      setLoading(false);
    };

  const handleChange = (
    e: any
  ) => {
    setFormData({
      ...formData,
      [
        e.target.name
      ]:
        e.target.value,
    });
  };

  const handleAddAdmin =
  async () => {
    if (
      !formData.full_name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      alert(
        "Fill all fields"
      );
      return;
    }

    try {
      // Hash password
      const hashedPassword =
        await bcrypt.hash(
          formData.password.trim(),
          10
        );

      const {
        error,
      } = await supabase
        .from(
          "admin_users"
        )
        .insert([
          {
            full_name:
              formData.full_name.trim(),

            username:
              formData.username.trim(),

            email:
              formData.email.trim(),

            password:
              hashedPassword,

            role:
              "admin",
          },
        ]);

      if (error) {
        alert(
          error.message
        );
        return;
      }

      alert(
        "Admin Added Successfully"
      );

      setFormData({
        full_name:
          "",
        username:
          "",
        email:
          "",
        password:
          "",
      });

      setShowModal(
        false
      );

      fetchAdmins();
    } catch (
      error
    ) {
      console.log(
        error
      );

      alert(
        "Something went wrong"
      );
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Admin
            Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all
            admins
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(
              true
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Plus
            size={20}
          />
          Add Admin
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-5 text-left">
                Name
              </th>

              <th className="p-5 text-left">
                Username
              </th>

              <th className="p-5 text-left">
                Email
              </th>

              <th className="p-5 text-left">
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={
                    4
                  }
                  className="text-center p-8"
                >
                  Loading...
                </td>
              </tr>
            ) : admins.length ===
              0 ? (
              <tr>
                <td
                  colSpan={
                    4
                  }
                  className="text-center p-8 text-gray-500"
                >
                  No Admins
                  Found
                </td>
              </tr>
            ) : (
              admins.map(
                (
                  admin
                ) => (
                  <tr
                    key={
                      admin.id
                    }
                    className="border-b"
                  >
                    <td className="p-5">
                      {
                        admin.full_name
                      }
                    </td>

                    <td className="p-5">
                      {
                        admin.username
                      }
                    </td>

                    <td className="p-5">
                      {
                        admin.email
                      }
                    </td>

                    <td className="p-5">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {
                          admin.role
                        }
                      </span>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-3xl p-8 w-[500px] shadow-2xl">

            <h2 className="text-3xl font-bold mb-6">
              Add Admin
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={
                  formData.full_name
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={
                  formData.username
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="px-5 py-3 rounded-xl bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleAddAdmin
                }
                className="px-5 py-3 rounded-xl bg-blue-600 text-white"
              >
                Save Admin
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}