import type { Metadata } from "next";
import type { Viewport } from "next";
import Link from "next/link";
import User from "@/models/User.jsx";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "User Details",
  description: "A small assignment",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export async function generateStaticParams() {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
 
  return res.data.map((user: User) => ({
    slug: String(user.id),
  }));
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${slug}`
  );
  const user = res.data as User;

  const dlDivClasses = "py-3 sm:py-[18px] sm:flex w-full sm:gap-4 sm:px-6";
  const dtClasses = "text-sm font-medium text-gray-500 sm:w-1/4 max-w-80";
  const ddClasses = "mt-1 text-sm text-gray-900 flex-grow sm:mt-0 sm:col-span-2 ";

  return (
    <>
      <Header>User Details</Header>

      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center h-[82px]">
          <h3 className="text-xl leading-6 font-semibold text-red-700">
            Information of {user?.name}
          </h3>
          <button className="bg-red-700 py-2 px-5 rounded-lg transition ease-in-out duration-150 hover:bg-red-900">
            <Link href="/" className="flex items-center">
              <FaAngleLeft className="inline text-white" />
              <span className="mt-0.5 ml-2 text-white">Back</span>
            </Link>
          </button>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className={dlDivClasses}>
              <dt className={dtClasses}>ID</dt>
              <dd className={ddClasses}>{user?.id}</dd>
            </div>
            <div className={dlDivClasses}>
              <dt className={dtClasses}>Full Name</dt>
              <dd className={ddClasses}>{user?.name}</dd>
            </div>
            <div className={dlDivClasses}>
              <dt className={dtClasses}>Email address</dt>
              <dd className={ddClasses}>{user?.email}</dd>
            </div>
            <div className={dlDivClasses}>
              <dt className={dtClasses}>Phone number</dt>
              <dd className={ddClasses}>{user?.phone}</dd>
            </div>
            <div className={dlDivClasses}>
              <dt className={dtClasses}>Company</dt>
              <dd className={ddClasses}>{user?.company.name}</dd>
            </div>
            <div className={dlDivClasses}>
              <dt className={dtClasses}>Address</dt>
              <dd className={ddClasses}>
                {user?.address.suite}, {user?.address.street}, {user?.address.city}, {user?.address.zipcode}
              </dd>
            </div>
            <div className={dlDivClasses}>
              <dt className={dtClasses}>Latitude, Longitude</dt>
              <dd className={ddClasses}>
                {user?.address.geo.lat}, {user?.address.geo.lng}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
