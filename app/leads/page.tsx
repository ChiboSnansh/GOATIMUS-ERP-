import Link from 'next/link'

export default function Leads() {
  const leads = [
    { id: 1, name: "John Doe", company: "ABC Corp", email: "john@abc.com", status: "New" },
    { id: 2, name: "Jane Smith", company: "XYZ Inc", email: "jane@xyz.com", status: "Contacted" },
    { id: 3, name: "Bob Johnson", company: "123 Industries", email: "bob@123.com", status: "Qualified" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Link href="/leads/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Lead
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/leads/${lead.id}`} className="text-blue-600 hover:text-blue-900 mr-2">View</Link>
                  <Link href={`/leads/${lead.id}/edit`} className="text-green-600 hover:text-green-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

