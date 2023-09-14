import { useState } from "react";
import Details from "./details";
import List from "./list";

export default function User() {
  const [selectedUser, setSelectedUser] = useState(undefined);
  console.log(selectedUser);

  const selectUser = (user) => {
    return () => {
      setSelectedUser(user);
    }
  }

  return (
    <div className="user">
      <List selectUser={selectUser} selectedUser={selectedUser}/>
      <Details info={selectedUser}/>
    </div>
  );
}