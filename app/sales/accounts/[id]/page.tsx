'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Account = {
  id: number;
  name: string;
  type: string;
  status: 'Active' | 'Closed Won' | 'Closed Lost';
  contactPerson: string;
  email: string;
  phone: string;
}

type SKU = {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function AccountDetails() {
  const params = useParams()
  const [account, setAccount] = useState<Account | null>(null)
  const [skus, setSKUs] = useState<SKU[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setAccount({
      id: Number(params.id),
      name: "TechCorp",
      type: "Potential",
      status: "Active",
      contactPerson: "John Doe",
      email: "john@techcorp.com",
      phone: "123-456-7890"
    })

    setSKUs([
      { id: 1, name: "Product A", price: 100, quantity: 5 },
      { id: 2, name: "Service B", price: 200, quantity: 2 },
      { id: 3, name: "License C", price: 500, quantity: 1 },
    ])
  }, [params.id])

  if (!account) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{account.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-semibold">Type:</dt>
                <dd>{account.type}</dd>
              </div>
              <div>
                <dt className="font-semibold">Status:</dt>
                <dd>{account.status}</dd>
              </div>
              <div>
                <dt className="font-semibold">Contact Person:</dt>
                <dd>{account.contactPerson}</dd>
              </div>
              <div>
                <dt className="font-semibold">Email:</dt>
                <dd>{account.email}</dd>
              </div>
              <div>
                <dt className="font-semibold">Phone:</dt>
                <dd>{account.phone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SKU Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skus.map((sku) => (
                  <TableRow key={sku.id}>
                    <TableCell>{sku.name}</TableCell>
                    <TableCell>${sku.price}</TableCell>
                    <TableCell>{sku.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {account.status === 'Closed Lost' && (
        <Card>
          <CardHeader>
            <CardTitle>Why Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This account was lost due to competitive pricing from another vendor.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

