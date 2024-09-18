import React from 'react'

export default function TableCustomer({data}) {
  return (
    <div className="overflow-y-auto max-h-60">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">UserName</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Street</th>
            <th className="py-3 px-6 text-left">Suite</th>
            <th className="py-3 px-6 text-left">City</th>
            <th className="py-3 px-6 text-left">Zipcode</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Website</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {data.map((val, key) => (
            <tr className="border-b border-gray-200" key={key}>
              <td className="py-3 px-6 text-left">{val.name}</td>
              <td className="py-3 px-6 text-left">{val.username}</td>
              <td className="py-3 px-6 text-left">{val.email}</td>
              <td className="py-3 px-6 text-left">{val.address?.street || 'N/A'}</td>
              <td className="py-3 px-6 text-left">{val.address?.suite || 'N/A'}</td>
              <td className="py-3 px-6 text-left">{val.address?.city || 'N/A'}</td>
              <td className="py-3 px-6 text-left">{val.address?.zipcode || 'N/A'}</td>
              <td className="py-3 px-6 text-left">{val.phone}</td>
              <td className="py-3 px-6 text-left">{val.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
