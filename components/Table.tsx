"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import User from "@/models/User.jsx";
import Header from "@/components/Header";

import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TABLE_HEAD = ["ID", "Name", "Email", "Phone", "Address"];
const itemsPerPage = 8;

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);

      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        const transformedUsers = res.data.map((user: User) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: { name: user.company.name },
          address: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: {
              lat: user.address.geo.lat,
              lng: user.address.geo.lng,
            },
          },
        }));
        setUsers(transformedUsers as User[]);
        setCurrentPage(1);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    getUsers();
  }, []);

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
    <>
      <Header>User List</Header>

      <div className="border shadow rounded-lg bg-white">
        <div className="flex justify-between px-6 py-2 items-center">
          <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TablePagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-fixed text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => {
                  let classes =
                    "border-y border-blue-gray-100 bg-blue-gray-50/50 p-4";
                  if (index === 0) classes += " pl-7 w-1/12";
                  if (index === 1) classes += " ";
                  if (index === 2) classes += " ";
                  if (index === 3) classes += " w-1/6";
                  if (index === 4) classes += " ";
                  return (
                    <th key={head} className={classes}>
                      {head}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {isError && <tr><td className="text-center py-10" colSpan={5}>Error loading data. Please try again later.</td></tr>}
              {isLoading && <tr><td className="text-center py-10" colSpan={5}>Loading ...</td></tr>}
              {paginatedData.map((item, index) => {
                const isLast = index === paginatedData.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr
                    key={item.id}
                    className="transition ease-in-out duration-100 hover:bg-red-200 hover:cursor-pointer"
                    onClick={() => goToUserDetailsPage(item.id)}
                  >
                    <td className={"pl-7 " + classes}>{item.id}</td>
                    <td className={classes}>{item.name}</td>
                    <td className={"truncate " + classes}>{item.email}</td>
                    <td className={"truncate " + classes}>{item.phone}</td>
                    <td className={"truncate " + classes}>
                      {item.address?.suite}, {item.address?.street}, {item.address.city}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
