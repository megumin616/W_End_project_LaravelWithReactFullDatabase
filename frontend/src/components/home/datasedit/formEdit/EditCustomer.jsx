import React, { useEffect, useState } from "react";

export default function EditCustomer({ token, id }) {
  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [formData, setFormData] = useState({
    name: "", // ชื่อผู้ใช้
    username: "", // ชื่อบัญชีผู้ใช้
    email: "", // อีเมล
    address: {
      street: "", // ถนน
      suite: "", // ห้องชุด
      city: "", // เมือง
      zipcode: "", // รหัสไปรษณีย์
    },
    phone: "", // เบอร์โทรศัพท์
    website: "", // เว็บไซต์
    company: {
      name: "", // ชื่อบริษัท
      catchPhrase: "", // คำขวัญบริษัท
      bs: "", // คำโฆษณาหรือบริการของบริษัท
    },
  });

  useEffect(() => {
    const fetchDataId = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/customer/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFormData({
        name: data.name || "",
        username: data.username || "",
        email: data.email || "",
        address: {
          street: data.address?.street || "",
          suite: data.address?.suite || "",
          city: data.address?.city || "",
          zipcode: data.address?.zipcode || "",
        },
        phone: data.phone || "",
        website: data.website || "",
        company: {
          name: data.company?.name || "",
          catchPhrase: data.company?.catchPhrase || "",
          bs: data.company?.bs || "",
        },
      });
    };
    fetchDataId();
  }, [id]);

  const addData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/customer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      }); // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
      setMessage(true);
    } else {
      setMessageError(true);
    }

    const timer = setTimeout(() => {
      setMessage(false);
      setMessageError(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  const handleChange = (e) => {
    // ดึงค่า name และ value จาก input field ที่ผู้ใช้กรอกข้อมูล
    const { name, value } = e.target;

    // ตรวจสอบว่า name ที่มาจาก input field เป็นฟิลด์ใน object เช่น address หรือ company หรือไม่
    if (name.includes("address.") || name.includes("company.")) {
      // แยกชื่อฟิลด์เป็นสองส่วน: parentKey และ childKey
      // ตัวอย่าง: ถ้า name เป็น "address.street" จะถูกแยกเป็น ["address", "street"]
      const [parentKey, childKey] = name.split(".");

      // อัปเดต formData สำหรับฟิลด์ที่อยู่ใน object เช่น address หรือ company
      setFormData((prevData) => ({
        ...prevData, // ใช้ spread operator เพื่อรักษาค่าเดิมทั้งหมดใน formData
        [parentKey]: {
          // อัปเดต object เช่น address หรือ company
          ...prevData[parentKey], // ใช้ spread operator เพื่อคงค่าของฟิลด์ย่อยที่มีอยู่เดิมใน object นั้น เช่น address
          [childKey]: value, // อัปเดตเฉพาะฟิลด์ย่อยที่เปลี่ยนแปลง เช่น street
        },
      }));
    } else {
      // ถ้าไม่ใช่ฟิลด์ใน object เช่น address หรือ company อัปเดตฟิลด์ปกติ
      setFormData((prevData) => ({
        ...prevData, // ใช้ spread operator เพื่อรักษาค่าเดิมทั้งหมดใน formData
        [name]: value, // อัปเดตฟิลด์ปกติ เช่น name, username, email, phone, website
      }));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700">FromCustomer</h2>
        {message ? (
          <h6 className="text-2xl font-bold text-green-700">
            Add successfully
          </h6>
        ) : (
          ""
        )}
        {messageError ? (
          <h6 className="text-2xl font-bold text-red-700">Add false</h6>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Name..."
        />
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="User Name..."
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email..."
        />
        <input
          name="address.street"
          value={formData.address?.street || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Street..."
        />
        <input
          name="address.suite"
          value={formData.address?.suite || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Suite..."
        />
        <input
          name="address.city"
          value={formData.address?.city || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="City..."
        />
        <input
          name="address.zipcode"
          value={formData.address?.zipcode || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Zipcode..."
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Phone..."
        />
        <input
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Website..."
        />
        <input
          name="company.name"
          value={formData.company?.name || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Company Name..."
        />
        <input
          name="company.catchPhrase"
          value={formData.company?.catchPhrase || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="catchPhrase..."
        />
        <input
          name="company.bs"
          value={formData.company?.bs || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="BS..."
        />
        <button
          onClick={addData}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Edit data
        </button>
      </div>
    </div>
  );
}
