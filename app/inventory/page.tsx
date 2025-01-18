'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import AddItemForm from './add-item-form'
import { Item } from './types'

// Mock data to simulate database
const initialItems: Item[] = [
  { id: 1, name: 'Laptop', sku: 'LAP001', quantity: 50, price: 999.99 },
  { id: 2, name: 'Mouse', sku: 'MOU001', quantity: 100, price: 24.99 },
  { id: 3, name: 'Keyboard', sku: 'KEY001', quantity: 75, price: 59.99 },
]

export default function InventoryManagement() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const addItem = (newItem: Omit<Item, 'id'>) => {
    const id = Math.max(...items.map(item => item.id)) + 1
    setItems([...items, { ...newItem, id }])
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <AddItemForm onSubmit={addItem} />
            </DialogContent>
          </Dialog>
          <Link href="/inventory/reports" passHref>
            <Button variant="outline">View Reports</Button>
          </Link>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Link href={`/inventory/${item.id}`} passHref>
                    <Button variant="link">Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

