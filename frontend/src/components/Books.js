import React, { useState, useEffect } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [term, setTerm] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  useEffect(() => {
    fetch("api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.msg));
  }, []);

  const handleSearch = () => {
    fetch(`api/books/search?term=${term}`)
      .then((res) => res.json())
      .then((data) => setBooks(data.msg));
  };

  const handleRentRange = () => {
    fetch(
      `api/books/rent-range?minRent=${minRent}&maxRent=${maxRent}`
    )
      .then((res) => res.json())
      .then((data) => setBooks(data.msg));
  };

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Books</h2>
        <div className="flex justify-between space-y-4 ">
            <div >
                <label className="block">Search by Name:</label>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="border p-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-2 ml-2"
                >
                    Search
                </button>
                </div>

                <div>
                <label className="block">Rent Range:</label>
                <input
                    type="number"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                    placeholder="Min Rent"
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    placeholder="Max Rent"
                    className="border p-2"
                />
                <button
                    onClick={handleRentRange}
                    className="bg-green-500 text-white p-2 ml-2"
                >
                    Filter
                </button>
            </div>
        </div>    

      <ul className="list-disc mt-4 ml-5">
        {books.map((book) => (
          <li key={book._id}>
            {book.name} - {book.category} - ₹{book.rentPerDay}/day
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
