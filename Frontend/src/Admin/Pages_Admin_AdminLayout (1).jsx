import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">iPhone Admin</h1>
        </div>
        <nav className="mt-6">
          <Link to="/admin">
            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          </Link>
          <Link to="/admin/products">
            <Button variant="ghost" className="w-full justify-start">Products</Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="ghost" className="w-full justify-start">Orders</Button>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;