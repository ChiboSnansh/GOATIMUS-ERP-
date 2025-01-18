import Link from 'next/link'

export default function Deals() {
  const deals = [
    { id: 1, name: "Project Alpha", company: "ABC Corp", value: "$50,000", closedDate: "2023-06-15" },
    { id: 2, name: "Service Beta", company: "XYZ Inc", value: "$75,000", closedDate: "2023-06-20" },
    { id: 3, name: "Product Gamma", company: "123 Industries", value: "$100,000", closedDate: "2023-06-25" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Closed Deals</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closed Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td className="px-6 py-4 whitespace-nowrap">{deal.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{deal.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{deal.value}</td>
                <td className="px-6 py-4 whitespace-nowrap">{deal.closedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/deals/${deal.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

