'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Opportunity = {
  id: number;
  name: string;
  account: string;
  value: number;
  stage: string;
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

export default function OpportunityDetails() {
  const params = useParams()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [skus, setSKUs] = useState<SKU[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setOpportunity({
      id: Number(params.id),
      name: "New Software Implementation",
      account: "TechCorp",
      value: 50000,
      stage: "Proposal",
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

  if (!opportunity) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{opportunity.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-semibold">Account:</dt>
                <dd>{opportunity.account}</dd>
              </div>
              <div>
                <dt className="font-semibold">Value:</dt>
                <dd>${opportunity.value.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="font-semibold">Stage:</dt>
                <dd>{opportunity.stage}</dd>
              </div>
              <div>
                <dt className="font-semibold">Contact Person:</dt>
                <dd>{opportunity.contactPerson}</dd>
              </div>
              <div>
                <dt className="font-semibold">Email:</dt>
                <dd>{opportunity.email}</dd>
              </div>
              <div>
                <dt className="font-semibold">Phone:</dt>
                <dd>{opportunity.phone}</dd>
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
      {opportunity.stage === 'Closed Lost' && (
        <Card>
          <CardHeader>
            <CardTitle>Why Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This opportunity was lost due to competitive pricing from another vendor.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

