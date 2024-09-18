import React, { useEffect, useState } from "react";

export default function EditPost({ token, id }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const fetchDataId = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // เมื่อดึงข้อมูลมาแล้ว เซ็ตค่าของ title และ body
      setTitle(data.title || ""); // ป้องกัน undefined
      setBody(data.body || ""); // ป้องกัน undefined
    };
    fetchDataId();
  }, [id]);

  // console.log('datafetch', dataFetchId.title)

  const addData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });

    if (response.ok) {
      setTitle("");
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
        <h2 className="text-2xl font-bold text-gray-700">Edit Post</h2>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title..."
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Body..."
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
