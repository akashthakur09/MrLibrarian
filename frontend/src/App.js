import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./components/Users";
import Books from "./components/Books";
import Transactions from "./components/Transactions";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 p-4 text-white">
          <h1 className="text-center text-3xl">Book Rental System</h1>
        </header>
        <nav className="bg-blue-500 p-4">
          <ul className="flex justify-center space-x-6 text-white">
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
          </ul>
        </nav>
        <div className="p-8">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/books" element={<Books />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
