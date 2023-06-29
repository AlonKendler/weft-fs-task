import { paginate } from "@/utils/pagination";
import { sortUsersByName } from "@/utils/sorting";

const USERS_API = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (page: number, limit: number) => {
  try {
    console.log(`[fetchUsers] page: ${page} limit: ${limit}`)
    const response = await fetch(USERS_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();

    // TODO: Store users in the MySQL database.

    // Sort users by name.
    // TODO: sort in client
    const sortedUsers = sortUsersByName(users);

    // Paginate the sorted users.
    const paginatedUsers = paginate(sortedUsers, limit, page);

    return paginatedUsers;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return null;
  }
};
