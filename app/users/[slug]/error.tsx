"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="grid min-h-full place-items-center py-24">
      <div className="text-center text-2xl">An error has occured. Please try again later.</div>
      <button className="mt-10 px-6 py-4 bg-red-600 text-white rounded-lg">
          <Link href="/">Back to User List</Link>
      </button>
    </div>
  );
}
