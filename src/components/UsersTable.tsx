import { useEffect, useState } from "react";
import { User } from "@/types";
import Link from "next/link";

type Props = {
  initialUsers: User[];
  initialPage: number;
};

const UserTable: React.FC<Props> = ({ initialUsers, initialPage }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState<number>(initialPage);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // Function to handle sorting of users.
  const sortUsers = () => {
    const newSort = sort === "asc" ? "desc" : "asc";
    setSort(newSort);

    const sortedUsers = [...users].sort((a, b) =>
      newSort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setUsers(sortedUsers);
  };

  // When initialUsers or initialPage changes, update users and page
  useEffect(() => {
    setUsers(initialUsers);
    setPage(initialPage);
  }, [initialUsers, initialPage]);

  // Calculate the users to display based on the current page.
  const startIndex = (page - 1) * 4; // Display 4 users per page
  const displayedUsers = users.slice(startIndex, startIndex + 4);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={sortUsers}
                  >
                    Name {sort === "asc" ? "↓" : "↑"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-1 py-1 xs:text-xs sm:whitespace-nowrap">
                      <Link href={`/posts/${user.id}?page=${1}`}>
                        {user.name}
                      </Link>
                    </td>
                    <td className="px-1 py-1 xs:text-xs sm:whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 w-12 inline-block overflow-hidden truncate">
                        {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
