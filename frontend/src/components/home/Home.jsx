import React, { useEffect, useState } from "react";
import TablePost from "./datashow/tablePost";
import TableComment from "./datashow/TableComment";
import TableCompany from "./datashow/TableCompany";
import TableCustomer from "./datashow/TableCustomer";
import PostEdit from "./datasedit/PostEdit";
import CommentEdit from "./datasedit/CommentEdit";
import CompanyEdit from "./datasedit/CompanyEdit";
import CustomerEdit from "./datasedit/CustomerEdit";
import FromPost from "./datafrom/FromPost";
import FromComment from "./datafrom/FromComment";
import FromCompany from "./datafrom/FromCompany";
import FromCustomer from "./datafrom/FromCustomer";

export default function Home() {
  const [valueFecth, setValueFecth] = useState("");
  const [dataShow, setDataShow] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [message, setMessage] = useState("");
  const [editFetch, setEditFetch] = useState("");
  const [addButton, setAddButton] = useState("");

  //state from page
  const [valueFromPost, setValueFromPost] = useState(false);
  const [valueFromComment, setValueFromComment] = useState(false);
  const [valueFromCompany, setValueFromCompany] = useState(false);
  const [valueFromCustomer, setValueFromCustomer] = useState(false);

  //state register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (valueFecth) {
      fetch(valueFecth)
        .then((response) => response.json())
        .then((data) => setDataShow(data));
    }
  }, [valueFecth]);


  useEffect(() => {
    if (editFetch) {
      fetch(editFetch)
        .then((response) => response.json())
        .then((data) => setDataEdit(data));
    }
  }, [editFetch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleShowData = (value) => {
    if (value === 0) {
      setValueFecth("http://127.0.0.1:8000/api/post");
    } else if (value === 1) {
      setValueFecth("http://127.0.0.1:8000/api/comment");
    } else if (value === 2) {
      setValueFecth("http://127.0.0.1:8000/api/company");
    } else if (value === 3) {
      setValueFecth("http://127.0.0.1:8000/api/customer");
    }
  };

  const handleEditData = (value) => {
    if (value === 0) {
      setEditFetch("http://127.0.0.1:8000/api/post");
      setAddButton("Add Post");
    } else if (value === 1) {
      setEditFetch("http://127.0.0.1:8000/api/comment");
      setAddButton("Add Comment");
    } else if (value === 2) {
      setEditFetch("http://127.0.0.1:8000/api/company");
      setAddButton("Add Company");
    } else if (value === 3) {
      setEditFetch("http://127.0.0.1:8000/api/customer");
      setAddButton("Add Customer");
    }
  };

  const handleFromData = () => {
    if (addButton === "Add Post") {
      setValueFromPost(true);
    } else if (addButton === "Add Comment") {
      setValueFromComment(true);
    } else if (addButton === "Add Company") {
      setValueFromCompany(true);
    } else if (addButton === "Add Customer") {
      setValueFromCustomer(true);
    }
  };

  const renderTable = () => {
    if (valueFecth.includes("post")) {
      return <TablePost data={dataShow} />;
    } else if (valueFecth.includes("comment")) {
      return <TableComment data={dataShow} />;
    } else if (valueFecth.includes("company")) {
      return <TableCompany data={dataShow} />;
    } else if (valueFecth.includes("customer")) {
      return <TableCustomer data={dataShow} />;
    }
  };

  const renderEdit = () => {
    if (editFetch.includes("post")) {
      return <PostEdit data={dataEdit} token={token}/>;
    } else if (editFetch.includes("comment")) {
      return <CommentEdit data={dataEdit} token={token}/>;
    } else if (editFetch.includes("company")) {
      return <CompanyEdit data={dataEdit} token={token}/>;
    } else if (editFetch.includes("customer")) {
      return <CustomerEdit data={dataEdit} token={token}/>;
    }
  };

  //register
  const handleSubmit = async () => {
    // Basic validation
    if (!name || !email || !password) {
      setMessage("Please fill all the fields.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Registration failed"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setMessage("Please fill all the fields.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setMessage("Registration successful!");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Registration failed"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setEditFetch("");
        setMessage("Registration successful!");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Registration failed"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };


  const closefrom = () => {
    setValueFromPost("");
    setValueFromComment("");
    setValueFromCompany("");
    setValueFromCustomer("");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-600 py-6 text-white text-center">
        <h1 className="text-4xl font-bold">DataTest API</h1>
      </header>

      {/* API Info Section */}
      <section className="w-full max-w-4xl mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">API Free</h2>
        <p className="text-gray-700 leading-relaxed">
          เว็บนี้เปิดให้เข้าถึงข้อมูลได้นำไปใช้ฟรี (JSON) โดยข้อมูลมีทั้งหมด
          post, comment, company, customer และสามารถจัดการข้อมูลต่างๆได้
          พัฒนาโดย Warathep Tanyaruk
        </p>
      </section>

      {/* Resources Section */}
      <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">ทรัพยากร</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span
              onClick={() => handleShowData(0)}
              className="font-medium cursor-pointer"
            >
              /post
            </span>{" "}
            <span>50 post</span>
          </li>
          <li className="flex justify-between">
            <span
              onClick={() => handleShowData(1)}
              className="font-medium cursor-pointer"
            >
              /comment
            </span>{" "}
            <span>50 comment</span>
          </li>
          <li className="flex justify-between">
            <span
              onClick={() => handleShowData(2)}
              className="font-medium cursor-pointer"
            >
              /company
            </span>{" "}
            <span>50 company</span>
          </li>
          <li className="flex justify-between">
            <span
              onClick={() => handleShowData(3)}
              className="font-medium cursor-pointer"
            >
              /customer
            </span>{" "}
            <span>50 customer</span>
          </li>
        </ul>
      </section>
      {/* Render table based on valueFecth */}
      {valueFecth && (
        <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">Table Data</h2>
          {renderTable()}
        </section>
      )}

      {/* Edit Data Section */}
      <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">แก้ไขข้อมูล</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Register */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Register</h3>
            {message ? (
              <h5 className="text-xl text-green-500 font-semibold mb-2">
                {message}
              </h5>
            ) : (
              ""
            )}
            <div className="space-y-2">
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="name..."
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="email..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="password..."
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
          {/* Login */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Login</h3>
            <div className="space-y-2">
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="email..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="password..."
                onChange={(e) => setPassword(e.target.value)}
              />
              <h2 className="w-full p-2 border border-gray-300 rounded-md break-words">
                Token <span>{token}</span>
              </h2>
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-11"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      {token ? (
        <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg flex justify-center space-x-4">
          <button
            onClick={() => handleEditData(0)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
          <button
            onClick={() => handleEditData(1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Comment
          </button>
          <button
            onClick={() => handleEditData(2)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Company
          </button>
          <button
            onClick={() => handleEditData(3)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Customer
          </button>
        </section>
      ) : (
        ""
      )}

      {/* Table Section */}
      {editFetch && (
        <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4">Table Data</h2>
            <button onClick={handleFromData} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              {addButton}
            </button>
          </div>
          {renderEdit()}
        </section>
      )}

      {valueFromPost ? (
        <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg mb-10">
         <FromPost data={token}/>
         <button onClick={closefrom} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Close</button>
        </section>
      ) : ""}
      {valueFromComment ? (
        <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg mb-10">
         <FromComment data={token}/>
         <button onClick={closefrom} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Close</button>
        </section>
      ) : ""}
      {valueFromCompany ? (
        <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg mb-10">
         <FromCompany data={token}/>
         <button onClick={closefrom} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Close</button>
        </section>
      ) : ""}
      {valueFromCustomer ? (
        <section className="w-full max-w-4xl mt-6 p-6 bg-white shadow-lg rounded-lg mb-10">
         <FromCustomer data={token}/>
         <button onClick={closefrom} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Close</button>
        </section>
      ) : ""}
    </div>
  );
}
