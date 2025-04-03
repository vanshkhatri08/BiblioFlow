import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

const Users = () => {
  const { users } = useSelector((state) => state.user)

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatedDate = '${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear())} ';
    const formattedTime = '${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}';
    const result =  `${formatDate} ${formattedTime}`;
    return result
    
  };



 cont result =  formatDate("");

  return <>
    <main className = "relative flex-1 p-6 pt-28">
      <Header />
      {/*Sub Header */}
      <header className = "flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <h2 className = "text-xl font-medium md:text-2xl md:font-semibold"> Registered Users</h2>
      </header>

      {/*Table */}
    </main>
  </>;
};

export default Users;
