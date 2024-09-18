import React, { useState } from 'react'
import EditComment from './formEdit/EditComment';
import EditCustomer from './formEdit/EditCustomer';

export default function CustomerEdit({data, token}) {
  const [showEdit, setShowEdit] = useState(false);
  const [idCustomer, setIdCustomer] = useState("");
  const [messageDelete, setMessageDelete] = useState(false);
  const handleEdit = (id) => {
    setIdCustomer(id);
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleDelete = async (id) => {
    // แสดงกล่องยืนยัน
    const confirmed = window.confirm(
      "Are you sure you want to delete?"
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/customer/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // ลบข้อมูลสำเร็จ
          setMessageDelete(true);
          const timer = setTimeout(() => {
            setMessageDelete(false);
          }, 4000);
          return () => clearTimeout(timer);
        } else {
          // การลบข้อมูลล้มเหลว
          alert("ลบล้มเหลว.");
        }
      } catch (error) {
        // จัดการข้อผิดพลาด
        console.error("An error occurred while deleting the faculty:", error);
        alert("An error occurred while deleting the faculty.");
      }
    } else {
      // ผู้ใช้เลือกที่จะไม่ลบ
      console.log("Deletion canceled.");
    }
  };
  return (
    <div>
      {messageDelete ? (<h5 className="text-green-400">Delete successfully</h5>) : ""}
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
            {/* <th className="py-3 px-6 text-left">Address</th> */}
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Website</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {data.map((val, key) => (
            <tr className="border-b border-gray-200" key={key}>
              <td className="py-3 px-6 text-left">{val.name}</td>
              <td className="py-3 px-6 text-left">{val.username}</td>
              <td className="py-3 px-6 text-left">{val.email}</td>
              <td className="py-3 px-6 text-left">
                {val.address?.street || 'N/A'}
              </td>
              <td className="py-3 px-6 text-left">
                {val.address?.suite || 'N/A'}
              </td>
              <td className="py-3 px-6 text-left">
                {val.address?.city || 'N/A'}
              </td>
              <td className="py-3 px-6 text-left">
                {val.address?.zipcode || 'N/A'}
              </td>
              <td className="py-3 px-6 text-left">{val.phone}</td>
              <td className="py-3 px-6 text-left">{val.website}</td>
              <td className="py-3 px-6 text-left">
                <button onClick={() => handleEdit(val.id)} className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(val.id)} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showEdit ? (
        <div className="m-10 bg-gray-200 flex-col">
          <div className="pt-10"><EditCustomer token={token} id={idCustomer}/></div>
          <button
            onClick={handleCloseEdit}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Close
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
