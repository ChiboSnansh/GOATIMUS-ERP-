'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Opportunity = {
  id: number;
  name: string;
  account: string;
  value: number;
  stage: string;
  salesPerson: string;
}

const salesPersons = ["Ravi A", "Rudrajeet", "Pradeep"]

// Mock existing accounts
const existingAccounts = ["TechCorp", "SecureNet", "CloudFirst", "InnovateInc", "GlobalSolutions"]

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    { id: 1, name: "New Software Implementation", account: "TechCorp", value: 3750000, stage: "Proposal", salesPerson: "Ravi A" },
    { id: 2, name: "Security Upgrade", account: "SecureNet", value: 5625000, stage: "Negotiation", salesPerson: "Rudrajeet" },
    { id: 3, name: "Cloud Migration", account: "CloudFirst", value: 7500000, stage: "Closed Won", salesPerson: "Pradeep" },
  ])

  const [newOpportunity, setNewOpportunity] = useState<Omit<Opportunity, 'id'>>({
    name: '',
    account: '',
    value: 0,
    stage: 'Proposal',
    salesPerson: ''
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [accountOption, setAccountOption] = useState<'existing' | 'new'>('existing')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewOpportunity(prev => ({ ...prev, [name]: name === 'value' ? parseFloat(value) : value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewOpportunity(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.max(...opportunities.map(o => o.id)) + 1
    setOpportunities(prev => [...prev, { id, ...newOpportunity }])
    setIsDialogOpen(false)
    setNewOpportunity({ name: '', account: '', value: 0, stage: 'Proposal', salesPerson: '' })
    setAccountOption('existing')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Opportunity</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Opportunity</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Opportunity Name</Label>
                <Input id="name" name="name" value={newOpportunity.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label>Account</Label>
                <RadioGroup defaultValue="existing" onValueChange={(value) => setAccountOption(value as 'existing' | 'new')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing">Use Existing Account</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">Add New Account</Label>
                  </div>
                </RadioGroup>
              </div>
              {accountOption === 'existing' ? (
                <div>
                  <Label htmlFor="account">Select Existing Account</Label>
                  <Select name="account" value={newOpportunity.account} onValueChange={(value) => handleSelectChange('account', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingAccounts.map((account) => (
                        <SelectItem key={account} value={account}>{account}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label htmlFor="account">New Account Name</Label>
                  <Input id="account" name="account" value={newOpportunity.account} onChange={handleInputChange} required />
                </div>
              )}
              <div>
                <Label htmlFor="value">Value (in INR)</Label>
                <Input id="value" name="value" type="number" value={newOpportunity.value} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="stage">Stage</Label>
                <Select name="stage" value={newOpportunity.stage} onValueChange={(value) => handleSelectChange('stage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                    <SelectItem value="Closed Won">Closed Won</SelectItem>
                    <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salesPerson">Sales Person</Label>
                <Select name="salesPerson" value={newOpportunity.salesPerson} onValueChange={(value) => handleSelectChange('salesPerson', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sales person" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesPersons.map((person) => (
                      <SelectItem key={person} value={person}>{person}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Add Opportunity</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Sales Person</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow key={opportunity.id}>
              <TableCell>{opportunity.name}</TableCell>
              <TableCell>{opportunity.account}</TableCell>
              <TableCell>₹{opportunity.value.toLocaleString()}</TableCell>
              <TableCell>{opportunity.stage}</TableCell>
              <TableCell>{opportunity.salesPerson}</TableCell>
              <TableCell>
                <Link href={`/sales/opportunities/${opportunity.id}`}>
                  <Button variant="link">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

