import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "iPhone 13", price: 799, stock: 50 },
  { id: 2, name: "iPhone 13 Pro", price: 999, stock: 30 },
  { id: 3, name: "iPhone 13 Pro Max", price: 1099, stock: 20 },
];

const AdminProducts = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Button className="mb-4">Add New Product</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProducts;