import Link from 'next/link'

export default function ViewLead({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the lead data based on the ID
  const lead = {
    id: params.id,
    name: "John Doe",
    company: "ABC Corp",
    email: "john@abc.com",
    phone: "123-456-7890",
    status: "New"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">View Lead</h1>
        <Link href="/leads" className="text-blue-600 hover:text-blue-800">
          Back to Leads
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.name}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Company</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.company}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.email}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.phone}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.status}</dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-end">
        <Link href={`/leads/${lead.id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Edit Lead
        </Link>
      </div>
    </div>
  )
}

