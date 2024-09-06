import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async ()=>{
        await axios.get("api/users")
        .then((res)=>{
            console.log(res.data);
            setUsers(res.data.users);
        })
        
        .catch((err)=>{
            console.log("error while fetching users",err);
        })
    }
    fetchData();
    
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="list-disc ml-5">
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
