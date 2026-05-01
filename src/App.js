import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  FaHome,
  FaMoneyBill,
  FaCog,
  FaUser,
  FaPhone,
  FaChevronDown
} from "react-icons/fa";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  // 🔁 Fetch data
  const fetchExpenses = () => {
    axios.get("http://127.0.0.1:8000/api/expenses/")
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ➕ Add
  const handleSubmit = (e) => {
    e.preventDefault();

      axios.post("http://127.0.0.1:8000/api/add/", {
      amount,
      category,
      date,
      description
    })
    .then(() => {
      alert("Expense added");
      fetchExpenses();

      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
    })
    .catch(err => console.log(err));
  };

  
  const deleteExpense = (id) => {
  console.log("Deleting ID:", id);

  axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`)
    .then(res => {
      console.log(res);
      alert("Deleted");
      fetchExpenses();
    })
    .catch(err => console.log(err));
};

  return (
    <div style={{ display: "flex" }}>

      
      <div className="sidebar">
        <h2>Expense App</h2>
        <ul className="menu">

  <li>
    <FaHome className="icon" />
    Home
  </li>

  <li onClick={() => setOpenMenu(!openMenu)}>
    <div className="menu-row">
      <div>
        <FaMoneyBill className="icon" />
        Expenses
      </div>

      <FaChevronDown />
    </div>
  </li>

  {openMenu && (
    <div className="submenu">

      <li>Add Expense</li>
      <li>View Expenses</li>
      <li>Monthly Report</li>

    </div>
  )}

  <li>
    <FaCog className="icon" />
    Settings
  </li>

  <li>
    <FaUser className="icon" />
    Login
  </li>

  <li>
    <FaPhone className="icon" />
    Contact
  </li>

  </ul>
  </div>

      
   <div className="main">

        
        <h2 className="dashboard">Dashboard</h2>
        <div style={{ display: "flex", gap: "20px",marginBottom:"20px" }}>
          <div className="card" >Total : ₹5000</div>
          <div className="card" id="one">Today : ₹500</div>
          <div className="card" id="two">Monthly : ₹2000</div>
          </div>
        

        
        <h2 className="tracker">Expense Tracker</h2>

        <form onSubmit={handleSubmit}>
          <input type="number" placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input type="text" placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input type="text" placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Add Expense</button>
        </form>

        
        <h2 className="exp">Expense List</h2>

        {expenses.map(exp => (
          <div className="expense-item" key={exp.id}>
            <span>{exp.category} - ₹{exp.amount}</span>

            <button
              className="delete-btn"
              onClick={() => deleteExpense(exp.id)}
            >
              Delete ❌
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;