"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [trade, setTrade] = useState("");
  const [semester, setSemester] = useState("");
  const [attendance, setAttendance] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const { data, error } = await supabase
      .from("students")
      .select("*");

    if (error) {
      console.log("Fetch error:", error);
    } else {
      setStudents(data || []);
    }
  }

  async function addStudent() {
    if (
      !name ||
      !rollNo ||
      !trade ||
      !semester ||
      !attendance
    ) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("students")
      .insert([
        {
          id: "JHITI" + Date.now(),
          name: name,
          roll_no: rollNo,
          trade: trade,
          semester: semester,
          attendance: Number(attendance),
        },
      ]);

    if (error) {
      console.log("Insert error:", error);
      alert("Error adding student");
    } else {
      alert("Student added successfully");

      fetchStudents();

      setName("");
      setRollNo("");
      setTrade("");
      setSemester("");
      setAttendance("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">
        Student Management
      </h1>

      <p className="text-gray-500 mb-6">
        Manage student records
      </p>

      {/* Add Student Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Add Student
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            onChange={(e) =>
              setRollNo(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Trade"
            value={trade}
            onChange={(e) =>
              setTrade(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={(e) =>
              setSemester(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Attendance %"
            value={attendance}
            onChange={(e) =>
              setAttendance(e.target.value)
            }
            className="border p-3 rounded"
          />
        </div>

        <button
          onClick={addStudent}
          className="mt-4 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
        >
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Roll No</th>
              <th className="p-4 text-left">Trade</th>
              <th className="p-4 text-left">Semester</th>
              <th className="p-4 text-left">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{student.id}</td>
                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.roll_no}</td>
                <td className="p-4">{student.trade}</td>
                <td className="p-4">{student.semester}</td>
                <td className="p-4">
                  {student.attendance ?? 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}