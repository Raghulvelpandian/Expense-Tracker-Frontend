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
  const [activePage, setActivePage] = useState("home");

  // FETCH EXPENSES
  const fetchExpenses = () => {
    axios
      .get("https://expense-tracker-ihb1.onrender.com/api/expenses/")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ADD EXPENSE
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://expense-tracker-ihb1.onrender.com/api/add/", {
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
      .catch((err) => console.log(err));
  };

  // DELETE EXPENSE
  const deleteExpense = (id) => {
    axios
      .delete(`https://expense-tracker-ihb1.onrender.com/api/delete/${id}/`)
      .then(() => {
        alert("Deleted");
        fetchExpenses();
      })
      .catch((err) => console.log(err));
  };

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Expense App</h2>

        <ul className="menu">

          <li onClick={() => setActivePage("home")}>
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
              <li onClick={() => setActivePage("add")}>Add Expense</li>
              <li onClick={() => setActivePage("view")}>View Expenses</li>
              <li onClick={() => setActivePage("report")}>Monthly Report</li>
            </div>
          )}

          <li onClick={() => setActivePage("settings")}>
            <FaCog className="icon" />
            Settings
          </li>

          <li onClick={() => setActivePage("login")}>
            <FaUser className="icon" />
            Login
          </li>

          <li onClick={() => setActivePage("contact")}>
            <FaPhone className="icon" />
            Contact
          </li>

        </ul>
      </div>

      {/* MAIN */}
      <div className="main">

        {activePage === "home" && (
          <>
            <h2 className="dashboard">Dashboard</h2>

            <div className="cards-row">
              <div className="card">
                Total : ₹{totalExpense}
              </div>

              <div className="card" id="one">
                Today : ₹500
              </div>

              <div className="card" id="two">
                Monthly : ₹2000
              </div>
            </div>

            <h2>Welcome to Expense Tracker</h2>

            <p>
              Track your expenses, manage your budget and monitor your monthly spending easily.
            </p>
          </>
        )}


        {activePage === "add" && (
          <>
            <h2 className="tracker">Expense Tracker</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button type="submit">
                Add Expense
              </button>
            </form>
          </>
        )}


        {activePage === "view" && (
          <>
            <h2 className="exp">Expense List</h2>

            {expenses.map((exp) => (
              <div className="expense-item" key={exp.id}>
                <span>
                  {exp.category} - ₹{exp.amount}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(exp.id)}
                >
                  Delete ❌
                </button>
              </div>
            ))}
          </>
        )}


        {activePage === "report" && (
          <>
            <h2 className="dashboard">Monthly Report</h2>

            <div className="card report-card">
              <h3>Total Expenses This Month</h3>
              <h1>₹{totalExpense}</h1>
            </div>
          </>
        )}


        {activePage === "settings" && (
          <>
            <h2 className="dashboard">Settings</h2>

            <div className="card settings-card">
              <p>🔔 Notifications</p>
              <p>🌙 Dark Mode</p>
              <p>🌐 Language</p>
              <p>🔒 Privacy Settings</p>
            </div>
          </>
        )}


        {activePage === "login" && (
          <>
            <h2 className="dashboard">Login</h2>

            <form>
              <input type="text" placeholder="Username" />

              <input type="password" placeholder="Password" />

              <button>
                Login
              </button>
            </form>
          </>
        )}


        {activePage === "contact" && (
          <>
            <h2 className="dashboard">Contact</h2>

            <div className="card contact-card">
              <p>Email : support@expenseapp.com</p>
              <p>Phone : +91 9876543210</p>
              <p>Location : Chennai, India</p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;


