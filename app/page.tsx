import Table from "../components/Table";
import User from "@/models/User";

export default async function Home() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    next: { revalidate: 600 },
  });
  const data = await res.json();

  const transformedUsers = data.map((user: User) => ({
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
    
  return (
    <Table users={transformedUsers} />
  );
}
