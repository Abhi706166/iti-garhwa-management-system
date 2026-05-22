import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Government ITI Garhwa
          </h1>

          <ul className="flex gap-6 text-sm md:text-base">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/about">About</Link>
            </li>

            <li>
              <Link href="/contact">Contact</Link>
            </li>

            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">
          Welcome to Government ITI Garhwa
        </h2>

        <p className="text-lg max-w-2xl mx-auto">
          Student Management System and Employee
          Management System for modern technical education.
        </p>

        <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold">
          Explore More
        </button>
      </section>
    </main>
  );
}