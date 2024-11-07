import type { Metadata, Viewport } from "next";
import Link from "next/link";
import User from "@/models/User.jsx";
import { FaAngleLeft } from "react-icons/fa6";
import Header from "@/components/Header";
import UserDtDd from "@/components/UserDtDd";

export const metadata: Metadata = {
  title: "User Details",
  description: "A small assignment",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export async function generateStaticParams() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
 
  return data.map((user: User) => ({
    slug: String(user.id),
  }));
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${slug}`, {
    next: { revalidate: 600 },
  });
  const user = await res.json() as User;

  
  return (
    <div className="p-3 sm:p-8">
      <Header>User Details</Header>

      <div className="bg-white overflow-hidden shadow rounded-lg border mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center h-[82px]">
          <h3 className="text-xl leading-6 font-semibold text-red-700">
            <span className="hidden sm:inline">Information of </span>{user?.name}
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
            <UserDtDd label="Full Name">{user?.name}</UserDtDd>
            <UserDtDd label="Email address">{user?.email}</UserDtDd>
            <UserDtDd label="Phone number">{user?.phone}</UserDtDd>
            <UserDtDd label="Company">{user?.company.name}</UserDtDd>
            <UserDtDd label="Address">{`${user?.address.suite}, ${user?.address.street}, ${user?.address.city}, ${user?.address.zipcode}`}</UserDtDd>
            <UserDtDd label="Latitude, Longitude">{`${user?.address.geo.lat}, ${user?.address.geo.lng}`}</UserDtDd>
          </dl>
        </div>
      </div>
    </div>
  );
}
