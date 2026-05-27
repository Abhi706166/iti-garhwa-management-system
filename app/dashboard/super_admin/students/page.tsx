"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentsPage() {
  const [showModal, setShowModal] = useState(false);

const [students, setStudents] = useState<any[]>([]);
const totalStudents = students.length;

const firstYearStudents = students.filter(
  (student) => student.year === "1st Year"
).length;

const secondYearStudents = students.filter(
  (student) => student.year === "2nd Year"
).length;

const totalTrades = new Set(
  students.map((student) =>
    student.trade
      ?.trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
  )
).size;

  // Form states
  const [name, setName] = useState("");
  const [trade, setTrade] = useState("");
  const [year, setYear] = useState("");
  const [rollNo, setRollNo] =
  useState<number | "">("");
  const [mobile, setMobile] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] =
  useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  // Save Student Function
const addStudent = async () => {
  if (!name || !trade || !year || !mobile) {
    alert("Please fill all fields");
    return;
  }

  let photoUrl = null;

  // Upload photo if selected
  if (photo) {
    // File size limit (5MB)
    if (photo.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const fileExt =
      photo.name.split(".").pop();

    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } =
      await supabase.storage
        .from("student-photos")
        .upload(fileName, photo);

    if (uploadError) {
      console.log(uploadError);
      alert(uploadError.message);
      return;
    }

    photoUrl = fileName;
  }

  // UPDATE EXISTING STUDENT
  if (editingId !== null) {
    const updateData: any = {
      name,
      trade,
      year,
      roll_no: rollNo,
      mobile,
    };

    // only update photo if uploaded
    if (photoUrl) {
      updateData.photo_url =
        photoUrl;
    }

    const { error } = await supabase
      .from("students")
      .update(updateData)
      .eq("id", editingId);

    if (error) {
      console.log(error);
      alert("Failed to update student");
      return;
    }

    alert(
      "Student updated successfully"
    );
  } else {
    // ADD NEW STUDENT
    const { error } = await supabase
      .from("students")
      .insert([
        {
          id: `JHITI${new Date().getFullYear()}${Math.floor(
            100000 +
              Math.random() * 900000
          )}`,
          name,
          trade,
          year,
          roll_no: rollNo,
          mobile,
          photo_url: photoUrl,
        },
      ]);

    if (error) {
        console.log(error);
        alert(error.message);
        return;
      }

    alert("Student added successfully");
  }

  // Refresh list
  await fetchStudents();

  // Reset everything
  setEditingId(null);
  setName("");
  setTrade("");
  setYear("");
  setRollNo("");
  setMobile("");
  setPhoto(null);
  setShowModal(false);
};

const deleteStudent = async (id: string) => {
  // Get student photo URL first
  const { data: student, error: fetchError } =
    await supabase
      .from("students")
      .select("photo_url")
      .eq("id", id)
      .single();

  if (fetchError) {
    console.log(fetchError);
    alert("Failed to fetch student");
    return;
  }

  // Delete photo from storage
  if (student?.photo_url) {
  const fileName =
    student.photo_url.split("/").pop();

  console.log("Deleting file:", fileName);

  const { error: storageError } =
    await supabase.storage
      .from("student-photos")
      .remove([fileName!]);

  if (storageError) {
    console.log(storageError);
    alert("Failed to delete photo");
  }
}

  // Delete student from database
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    alert("Failed to delete student");
    return;
  }

  alert("Student deleted successfully");

  // Refresh table
  await fetchStudents();
};

useEffect(() => {
  fetchStudents();
}, []);

const fetchStudents = async () => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    setStudents(data);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Students Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all student records
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          + Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  {/* Total Students */}
  <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-md">
    <h2 className="text-lg font-medium">
      Total Students
    </h2>
    <p className="text-4xl font-bold mt-2">
      {totalStudents}
    </p>
  </div>

  {/* 1st Year */}
  <div className="bg-green-600 text-white rounded-2xl p-6 shadow-md">
    <h2 className="text-lg font-medium">
      1st Year Students
    </h2>
    <p className="text-4xl font-bold mt-2">
      {firstYearStudents}
    </p>
  </div>

  {/* 2nd Year */}
  <div className="bg-yellow-500 text-white rounded-2xl p-6 shadow-md">
    <h2 className="text-lg font-medium">
      2nd Year Students
    </h2>
    <p className="text-4xl font-bold mt-2">
      {secondYearStudents}
    </p>
  </div>

  {/* Total Trades */}
  <div className="bg-purple-600 text-white rounded-2xl p-6 shadow-md">
    <h2 className="text-lg font-medium">
      Total Trades
    </h2>
    <p className="text-4xl font-bold mt-2">
      {totalTrades}
    </p>
  </div>

</div>

      {/* Search */}
      <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
          <input
            type="text"
            placeholder="Search by name, trade, or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
             <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Photo</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Trade</th>
                <th className="p-4 text-left">Year</th>
                <th className="p-4 text-left">Roll No</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {students
                .filter((student) =>
                  student.id
                    ?.toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  student.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  student.trade
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  student.year
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  student.roll_no
                    ?.toString()
                    .includes(search) ||
                  student.mobile
                    ?.toString()
                    .includes(search)
                )
                .map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >
                    {/* ID */}
                    <td className="p-4">{student.id}</td>

                    {/* Photo */}
                    <td className="p-4">
                      <img
                      src={
                        student.photo_url
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/student-photos/${student.photo_url}`
                          : "/default-user.png"
                      }
                      alt={student.name}
                      className="w-14 h-14 rounded-full object-cover border"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/default-user.png";
                      }}
                    />
                    </td>

                    {/* Name */}
                    <td className="p-4 font-medium">
                      {student.name}
                    </td>

                    {/* Trade */}
                    <td className="p-4">
                      {student.trade}
                    </td>

                    {/* Year */}
                    <td className="p-4">
                      {student.year}
                    </td>

                    <td className="p-4">
                      {student.roll_no}
                    </td>

                    {/* Mobile */}
                    <td className="p-4">
                      {student.mobile}
                    </td>

                    {/* Action */}
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(student.id);
                            setName(student.name || "");
                            setTrade(student.trade || "");
                            setYear(student.year || "");
                            setRollNo(student.roll_no || "");
                            setMobile(student.mobile || "");
                            setShowModal(true);
                          }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold mb-5">
              Add New Student
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              />

              <input
                type="text"
                placeholder="Trade"
                value={trade}
                onChange={(e) =>
                  setTrade(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              />

              <select
                value={year}
                onChange={(e) =>
                  setYear(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              >
                <option value="">
                  Select Year
                </option>
                <option>1st Year</option>
                <option>2nd Year</option>
              </select>
                <input
                  type="number"
                  placeholder="Roll Number"
                  value={rollNo}
                  onChange={(e) =>
                    setRollNo(
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                    )
                  }
                  className="w-full border border-gray-300 rounded-xl p-3"
                />
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3"
              />
              <div>
                <label className="block text-sm font-medium mb-2">
                  Student Photo
                </label>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) =>
                    setPhoto(
                      e.target.files?.[0] || null
                    )
                  }
                  className="w-full border rounded-lg p-2"
                />

                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, WEBP only (Max 5MB)
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="bg-gray-400 text-white px-5 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={addStudent}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                Save Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}