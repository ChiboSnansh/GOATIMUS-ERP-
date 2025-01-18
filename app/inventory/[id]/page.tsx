'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { Item } from '../types'

// Mock function to simulate fetching item from database
const fetchItem = (id: number): Promise<Item> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: 'Sample Item',
        sku: 'SAMPLE001',
        quantity: 10,
        price: 99.99,
      })
    }, 500)
  })
}

export default function EditItem({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    fetchItem(parseInt(params.id)).then(setItem)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setItem(prev => prev ? {
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : name === 'price' ? parseFloat(value) : value,
    } : null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (item) {
      // In a real app, you would send this data to your backend
      console.log('Updated item:', item)
      router.push('/inventory')
    }
  }

  if (!item) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Item</h1>
        <Link href="/inventory" passHref>
          <Button variant="outline">Back to Inventory</Button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded-lg p-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            value={item.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={item.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={item.price}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}

