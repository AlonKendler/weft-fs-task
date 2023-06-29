
//api/users.ts

const USERS_API = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
  try {
    const response = await fetch(USERS_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let users = await response.json();

    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return null;
  }
};
