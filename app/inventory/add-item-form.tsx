import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Item } from './types'

type AddItemFormProps = {
  onSubmit: (item: Omit<Item, 'id'>) => void
}

export default function AddItemForm({ onSubmit }: AddItemFormProps) {
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({
    name: '',
    sku: '',
    quantity: 0,
    price: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : name === 'price' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newItem)
    setNewItem({ name: '', sku: '', quantity: 0, price: 0 })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="sku">SKU</Label>
        <Input
          id="sku"
          name="sku"
          value={newItem.sku}
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
          value={newItem.quantity}
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
          value={newItem.price}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Add Item</Button>
    </form>
  )
}

