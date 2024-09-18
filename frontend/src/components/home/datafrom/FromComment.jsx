import React, { useState } from 'react';

export default function FromComment({data}) {
  const token = data;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const addData = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "body": body
       }),
    });

    if (response.ok) {
      setName("");
      setEmail("");
      setBody("");
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
        <h2 className="text-2xl font-bold text-gray-700">FromComment</h2>
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
        onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Name..."
        />
        <input
        onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email..."
        />
        <input
        onChange={(e) => setBody(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Body..."
        />
        <button
          onClick={addData}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add data
        </button>
      </div>
    </div>
  );
}
