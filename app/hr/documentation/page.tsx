'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Documentation() {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Employee Handbook", category: "Policies", lastUpdated: "2023-06-01" },
    { id: 2, name: "Health and Safety Guidelines", category: "Safety", lastUpdated: "2023-05-15" },
    { id: 3, name: "Code of Conduct", category: "Policies", lastUpdated: "2023-04-22" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newDocument, setNewDocument] = useState({ name: "", category: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDocument(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDoc = {
      id: documents.length + 1,
      ...newDocument,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setDocuments(prev => [...prev, newDoc])
    setIsOpen(false)
    setNewDocument({ name: "", category: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Documentation</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Upload New Document</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Document Name</Label>
                <Input id="name" name="name" value={newDocument.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={newDocument.category} onChange={handleInputChange} required />
              </div>
              <Button type="submit">Upload</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.category}</TableCell>
              <TableCell>{doc.lastUpdated}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => alert(`Viewing ${doc.name}`)}>View</Button>
                <Button variant="outline" size="sm" onClick={() => alert(`Editing ${doc.name}`)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

