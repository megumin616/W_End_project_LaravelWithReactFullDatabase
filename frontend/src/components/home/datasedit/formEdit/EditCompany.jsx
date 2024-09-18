import React, { useEffect, useState } from 'react';

export default function EditCompany({token, id}) {
  const [nameCompany, setNameCompany] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const fetchDataId = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/company/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNameCompany(data.name_company || "");
      setProduct(data.product || "");
      setPrice(data.price || "");
      setPhone(data.phone || "");
    };
    fetchDataId();
  }, [id]);

  const addData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/company/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "name_company": nameCompany,
        "product": product,
        "price": price,
        "phone": phone
       }),
    });

    if (response.ok) {
      setNameCompany("");
      setProduct("");
      setPrice("");
      setPhone("");
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
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700">FromCompany</h2>
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
          value={nameCompany}
          onChange={(e) => setNameCompany(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Name Company..."
        />
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Product..."
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Price..."
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Phone..."
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
