import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: 1, customer: "John Doe", total: 799, status: "Completed" },
  { id: 2, customer: "Jane Smith", total: 1998, status: "Processing" },
  { id: 3, customer: "Bob Johnson", total: 1099, status: "Shipped" },
];

const AdminOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <Badge variant={order.status === "Completed" ? "success" : "default"}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrders;