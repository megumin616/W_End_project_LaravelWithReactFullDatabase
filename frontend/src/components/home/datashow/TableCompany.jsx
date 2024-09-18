import React from 'react'

export default function TableCompany({data}) {
  return (
    <div className="overflow-y-auto max-h-60">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">name_company</th>
            <th className="py-3 px-6 text-left">Product</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Phone</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {data.map((val, key) => (
            <tr className="border-b border-gray-200" key={key}>
              <td className="py-3 px-6 text-left">{val.name_company}</td>
              <td className="py-3 px-6 text-left">{val.product}</td>
              <td className="py-3 px-6 text-left">{val.price}</td>
              <td className="py-3 px-6 text-left">{val.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
