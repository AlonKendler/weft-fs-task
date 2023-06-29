// src/pages/index.tsx
import { GetServerSideProps } from "next";
import UserTable from "@/components/UsersTable";
import { fetchUsers } from "@/pages/api/users";
import { User } from "@/types";

type HomePageProps = {
  users: User[];
  page: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  let users: User[] = [];

  try {
    const fetchedUsers = await fetchUsers();
    users = fetchedUsers || [];
    if (!users) {
      throw new Error("No users found");
    }
  } catch (error) {
    console.error("Failed to fetch users", error);
  }

  return {
    props: {
      users,
      page,
    },
  };
};

export default function Home({ users, page }: HomePageProps) {
  return (
    <>
      <UserTable initialUsers={users} initialPage={page} />
      <div className="mt-4">
        <button
          className="mr-2 px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            window.location.href = `/?page=${Math.max(1, page - 1)}`;
          }}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            window.location.href = `/?page=${page + 1}`;
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
