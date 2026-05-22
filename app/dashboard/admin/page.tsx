import Link from "next/link";
export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white min-h-screen p-5">
        <h1 className="text-2xl font-bold mb-8">
          ITI Garhwa Admin
        </h1>



      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h2>

            <p className="text-gray-500">
              Welcome to Government ITI Garhwa Portal
            </p>
          </div>

          <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-blue-900">
              Total Students
            </h3>

            <p className="text-4xl font-bold mt-4">
              520
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-green-700">
              Employees
            </h3>

            <p className="text-4xl font-bold mt-4">
              35
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-orange-600">
              Notices
            </h3>

            <p className="text-4xl font-bold mt-4">
              12
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}