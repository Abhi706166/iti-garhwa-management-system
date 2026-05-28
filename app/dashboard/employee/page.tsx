"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);

  const [search, setSearch] =
    useState("");

    const [
  selectedDepartment,
  setSelectedDepartment,
] = useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [
    editingEmployee,
    setEditingEmployee,
  ] = useState<any>(null);

  const [name, setName] =
    useState("");

  const [
    designation,
    setDesignation,
  ] = useState("");

  const [department, setDepartment] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] = useState("");

  const [salary, setSalary] =
    useState("");

  const [joiningDate, setJoiningDate] =
    useState("");

  const [photo, setPhoto] =
    useState<any>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    const { data, error } =
      await supabase
        .from("employees")
        .select("*")
        .order("employee_id", {
          ascending: true,
        });

    if (error) {
      console.log(error);
      return;
    }

    setEmployees(data || []);
  };

  

  // ADD EMPLOYEE
  const addEmployee = async () => {
    try {
      let photoUrl = "";

      // Upload photo
      if (photo) {
        const fileName =
          `${Date.now()}-${photo.name}`;

        const {
          error: uploadError,
        } =
          await supabase.storage
            .from("employee-photos")
            .upload(fileName, photo);

        if (uploadError) {
          console.log(uploadError);

          alert(
            "Photo upload failed"
          );

          return;
        }

        const { data } =
          supabase.storage
            .from("employee-photos")
            .getPublicUrl(fileName);

        photoUrl =
          data.publicUrl;
      }

        // Email validation
       if (
        email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
          alert("Enter valid email");
          return;
        }

      // Required validation
      if (!name.trim()) {
        alert("Employee name is required");
        return;
      }

      if (mobile.length !== 10) {
        alert(
          "Enter valid mobile number"
        );
        return;
      }

      // Generate Employee ID
      const employeeId =
        Math.floor(
          100000 +
            Math.random() * 900000
        );

      // Insert employee
      const { error } =
        await supabase
          .from("employees")
          .insert([
            {
              employee_id:
                employeeId,

              photo_url:
                photoUrl,

              name:
                name.trim(),

              designation:
                designation.trim(),

              department:
                department.trim(),

              mobile:
                mobile.trim(),

              email:
                email.trim() || null,

              salary: Number(salary) || 0,

              joining_date:
                joiningDate,
            },
          ]);

      if (error) {
        console.log(error);

        alert(error.message);

        return;
      }

      alert(
        "Employee added successfully"
      );

      resetForm();

      await fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async () => {
    try {
      if (!editingEmployee) return;

      let photoUrl =
        editingEmployee.photo_url || "";

        // Email validation
      if (
        email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ){
        alert("Enter valid email");
        return;
      }

      // Required validation
      if (!name.trim()) {
        alert("Employee name is required");
        return;
      }

      if (mobile.length !== 10) {
        alert(
          "Enter valid mobile number"
        );
        return;
      }

      // Replace old image
      if (photo) {
        // Delete old photo
        if (
          editingEmployee.photo_url
        ) {
          const oldFileName =
            editingEmployee.photo_url.split(
              "employee-photos/"
            )[1];

          if (oldFileName) {
            await supabase.storage
              .from(
                "employee-photos"
              )
              .remove([
                oldFileName,
              ]);
          }
        }

        // Upload new photo
        const fileName =
          `${Date.now()}-${photo.name}`;

        const {
          error: uploadError,
        } =
          await supabase.storage
            .from("employee-photos")
            .upload(fileName, photo);

        if (uploadError) {
          console.log(uploadError);

          alert(
            "Photo upload failed"
          );

          return;
        }

        const { data } =
          supabase.storage
            .from("employee-photos")
            .getPublicUrl(fileName);

        photoUrl =
          data.publicUrl;
      }

      // Update employee
      const { error } =
        await supabase
          .from("employees")
          .update({
            name:
              name.trim(),

            designation:
              designation.trim(),

            department:
              department.trim(),

            mobile:
              mobile.trim(),

            email:
              email.trim() || null,

            salary: Number(salary) || 0,

            joining_date:
              joiningDate,

            photo_url:
              photoUrl,
          })
          .eq(
            "employee_id",
            editingEmployee.employee_id
          );

      if (error) {
        console.log(error);

        alert(
          "Failed to update employee"
        );

        return;
      }

      alert(
        "Employee updated successfully"
      );

      resetForm();

      await fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (
    employee_id: number
  ) => {
    const confirmDelete =
      confirm(
        "Are you sure you want to delete this employee?"
      );

    if (!confirmDelete) return;

    // Get photo url
    const { data: employee } =
      await supabase
        .from("employees")
        .select("photo_url")
        .eq(
          "employee_id",
          employee_id
        )
        .single();

    // Delete photo
    if (employee?.photo_url) {
      const fileName =
        employee.photo_url.split(
          "employee-photos/"
        )[1];

      if (fileName) {
        await supabase.storage
          .from("employee-photos")
          .remove([fileName]);
      }
    }

    // Delete employee
    const { error } =
      await supabase
        .from("employees")
        .delete()
        .eq(
          "employee_id",
          employee_id
        );

    if (error) {
      console.log(error);

      alert(
        "Failed to delete employee"
      );

      return;
    }

    alert(
      "Employee deleted successfully"
    );

    fetchEmployees();
  };

  // RESET FORM
  const resetForm = () => {
    setName("");
    setDesignation("");
    setDepartment("");
    setMobile("");
    setEmail("");
    setSalary("");
    setJoiningDate("");
    setPhoto(null);

    setShowForm(false);

    setIsEditing(false);

    setEditingEmployee(null);
  };

  // FILTER EMPLOYEE
  const filteredEmployees =
  employees.filter(
    (employee) => {
      const matchesSearch =
        employee.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        employee.employee_id
          ?.toString()
          .includes(search);

      const matchesDepartment =
        selectedDepartment ===
          "All" ||
        employee.department ===
          selectedDepartment;

      return (
        matchesSearch &&
        matchesDepartment
      );
    }
  );

const departments = [
  "All",
  ...new Set(
    employees
      .map(
        (employee) =>
          employee.department
      )
      .filter(Boolean)
  ),
];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Employee Management
          </h1>

          <p className="text-gray-500">
            Manage employee records
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-900 text-white px-5 py-3 rounded-lg"
        >
          + Add Employee
        </button>
      </div>

      {/* SEARCH + FILTER */}
<div className="bg-white p-4 rounded-2xl shadow mb-6 flex gap-4">

  <input
    type="text"
    placeholder="Search by Employee ID or Name"
    className="flex-1 p-4 border rounded-lg outline-none"
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
  />

  <select
    value={
      selectedDepartment
    }
    onChange={(e) =>
      setSelectedDepartment(
        e.target.value
      )
    }
    className="border rounded-lg px-4 py-3"
  >
    {departments.map(
      (dept) => (
        <option
          key={dept}
          value={dept}
        >
          {dept}
        </option>
      )
    )}
  </select>

</div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-900 text-white">

            <tr>
              <th className="p-4 text-left">
                Employee ID
              </th>

              <th className="p-4 text-left">
                Photo
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Designation
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Mobile
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Salary
              </th>

              <th className="p-4 text-left">
                Joining Date
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map(
              (employee) => (
                <tr
                  key={
                    employee.employee_id
                  }
                  className="border-b"
                >
                  <td className="p-4">
                    {
                      employee.employee_id
                    }
                  </td>

                  <td className="p-4">
                    {employee.photo_url && (
                      <img
                        src={
                          employee.photo_url
                        }
                        alt="Employee"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    )}
                  </td>

                  <td className="p-4">
                    {employee.name}
                  </td>

                  <td className="p-4">
                    {
                      employee.designation
                    }
                  </td>

                  <td className="p-4">
                    {
                      employee.department
                    }
                  </td>

                  <td className="p-4">
                    +91 {
                      employee.mobile
                    }
                  </td>

                  <td className="p-4">
                    {employee.email || "—"}
                  </td>

                  <td className="p-4">
                    ₹ {
                      employee.salary
                    }
                  </td>

                  <td className="p-4">
                    {
                      employee.joining_date
                    }
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => {
                        setIsEditing(true);

                        setShowForm(true);

                        setEditingEmployee(
                          employee
                        );

                        setPhoto(null);

                        setName(
                          employee.name
                        );

                        setDesignation(
                          employee.designation
                        );

                        setDepartment(
                          employee.department
                        );

                        setMobile(
                          employee.mobile
                        );

                        setEmail(
                          employee.email || ""
                        );

                        setSalary(
                          employee.salary?.toString()
                        );

                        setJoiningDate(
                          employee.joining_date
                        );
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteEmployee(
                          employee.employee_id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* POPUP FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white p-8 rounded-2xl w-[500px] shadow-xl">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold">
                {isEditing
                  ? "Update Employee"
                  : "Add Employee"}
              </h2>

              <button
                onClick={resetForm}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">

              <input
                type="file"
                onChange={(e) =>
                  setPhoto(
                    e.target.files?.[0]
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Employee Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Designation"
                value={designation}
                onChange={(e) =>
                  setDesignation(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) =>
                  setDepartment(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              <div className="flex items-center border rounded-lg p-3">

                <span className="mr-2 text-gray-500">
                  +91
                </span>

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) =>
                    setMobile(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  className="w-full outline-none"
                />
              </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full border p-3 rounded-lg"
                />

              <input
                type="number"
                placeholder="Salary"
                value={salary}
                onChange={(e) =>
                  setSalary(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="date"
                value={joiningDate}
                onChange={(e) =>
                  setJoiningDate(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              <button
                onClick={() =>
                  isEditing
                    ? updateEmployee()
                    : addEmployee()
                }
                className="w-full bg-blue-900 text-white py-3 rounded-lg"
              >
                {isEditing
                  ? "Update Employee"
                  : "Save Employee"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}