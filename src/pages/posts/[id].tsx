// pages/posts/[id].tsx
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import PostsHandler from "@/components/PostHandler";
import { Post } from "@/types";

type PostPageProps = {
  id: string;
  initialPosts: Post[];
  page: number;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params || typeof context.params.id !== "string") {
    // Handle the error appropriately, like returning a 404 page.
    return {
      notFound: true,
    };
  }
  const { id } = context.params;
  const page = context.query.page ?? 1;
  let initialPosts: Post[] = [];

  console.log("getInitialPosts", id);

  try {
    const response = await fetch(
      `/api/posts/getPostsByUserId?userId=${id}&page=${page}&limit=5`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    initialPosts = await response.json();
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }

  return {
    props: {
      id,
      initialPosts,
      page,
    },
  };
};

const PostsPage = ({ id, initialPosts, page }: PostPageProps) => {
  return (
    <>
      <Link href={`/`}>back to main</Link>
      <PostsHandler id={id} initialPosts={initialPosts} page={page} />
    </>
  );
};

export default PostsPage;
