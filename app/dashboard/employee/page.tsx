export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Employee Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome back, Rajesh Kumar
          </p>
        </div>

        <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-blue-900">
            Assigned Students
          </h2>

          <p className="text-4xl font-bold mt-4">
            120
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-green-700">
            Attendance Submitted
          </h2>

          <p className="text-4xl font-bold mt-4">
            85%
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-orange-600">
            Notices
          </h2>

          <p className="text-4xl font-bold mt-4">
            4
          </p>
        </div>

      </div>

      {/* Employee Profile */}
      <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Employee Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> Rajesh Kumar</p>
          <p><strong>Department:</strong> Electrician</p>
          <p><strong>Designation:</strong> Instructor</p>
          <p><strong>Experience:</strong> 8 Years</p>
        </div>
      </div>

    </div>
  );
}