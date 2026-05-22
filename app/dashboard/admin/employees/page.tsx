export default function EmployeesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Employee Management
          </h1>

          <p className="text-gray-500">
            Manage employee and instructor records
          </p>
        </div>

        <button className="bg-blue-900 text-white px-5 py-3 rounded-lg hover:bg-blue-800">
          + Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Designation</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">
              <td className="p-4">E101</td>
              <td className="p-4">Rajesh Kumar</td>
              <td className="p-4">Instructor</td>
              <td className="p-4">Electrician</td>
              <td className="p-4">8 Years</td>
              <td className="p-4">
                <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-4">E102</td>
              <td className="p-4">Anita Sharma</td>
              <td className="p-4">Lab Assistant</td>
              <td className="p-4">Fitter</td>
              <td className="p-4">5 Years</td>
              <td className="p-4">
                <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  );
}