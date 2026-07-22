import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "admin") return null;
  
  await connectDB();
  return await User.findById(decoded.userId).select("-password");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");
  
  return (
    <div className="min-h-screen bg-dark-900 flex">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-dark-800 border-r border-white/5 z-40 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold text-gradient">NexGen IT</h1>
        </div>
        <nav className="flex-1 p-4">
          <a href="/admin" className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all">Dashboard</a>
          <a href="/admin/users" className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all">Users</a>
          <a href="/admin/services" className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all">Services</a>
          <a href="/admin/requests" className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all">Requests</a>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="h-16 border-b border-white/5 flex items-center px-6">
          <span className="text-white font-medium">Admin Panel</span>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}