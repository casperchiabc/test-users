"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/models/User.jsx";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";

const TABLE_HEAD = ["ID", "Name", "Email", "Phone", "Address"];
const itemsPerPage = 8;

export default function Table(props: { users: User[] }) {
  const users = props.users;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const router = useRouter();
  const goToUserDetailsPage = (id: number) => router.push(`/users/${id}`);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <div className="border shadow rounded-lg bg-white mb-6">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between px-3 sm:px-6 py-2 sm:items-center">
        <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-fixed text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => {
                let classes =
                  "border-y border-blue-gray-100 bg-blue-gray-50/50 p-4";
                if (head === "ID") classes += " pl-4 sm:pl-7 w-1/12";
                if (head === "Email") classes += " hidden sm:table-cell";
                if (head === "Phone") classes += " lg:w-1/6";
                if (head === "Address")
                  classes += " hidden lg:table-cell xl:w-1/3";
                return (
                  <th key={head} className={classes}>
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const isLast = index === paginatedData.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr
                  key={item.id}
                  className="transition ease-in-out duration-100 hover:bg-red-200 hover:cursor-pointer"
                  onClick={() => goToUserDetailsPage(item.id)}
                >
                  <td className={"pl-4 sm:pl-7 " + classes}>{item.id}</td>
                  <td className={classes}>{item.name}</td>
                  <td className={"truncate hidden sm:table-cell " + classes}>
                    {item.email}
                  </td>
                  <td className={"truncate " + classes}>{item.phone}</td>
                  <td className={"truncate hidden lg:table-cell " + classes}>
                    {item.address?.suite}, {item.address?.street},{" "}
                    {item.address.city}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
