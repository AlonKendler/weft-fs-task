import { User } from "@/types";
import Link from "next/link";

type Props = {
  users: User[];
};

//TODO: eliipses and clip adress, maybe https://github.com/tailwindlabs/tailwindcss-line-clamp/
const UserTable: React.FC<Props> = ({ users }) => {
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
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
                {users.map((user, personIdx) => (
                  <tr key={user.id}>
                    <td className="px-1 py-1 xs:text-xs sm:whitespace-nowrap">
                      <Link
                        href={`/posts/${user.id}?page=${1}`}
                        className="text-sm"
                      >
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
