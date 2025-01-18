import Link from 'next/link'

export default function Opportunities() {
  const opportunities = [
    { id: 1, name: "Project Alpha", company: "ABC Corp", value: "$50,000", stage: "Proposal" },
    { id: 2, name: "Service Beta", company: "XYZ Inc", value: "$75,000", stage: "Negotiation" },
    { id: 3, name: "Product Gamma", company: "123 Industries", value: "$100,000", stage: "Closing" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <Link href="/opportunities/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Opportunity
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id}>
                <td className="px-6 py-4 whitespace-nowrap">{opportunity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{opportunity.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{opportunity.value}</td>
                <td className="px-6 py-4 whitespace-nowrap">{opportunity.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/opportunities/${opportunity.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                  {' | '}
                  <Link href={`/opportunities/${opportunity.id}/edit`} className="text-green-600 hover:text-green-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

