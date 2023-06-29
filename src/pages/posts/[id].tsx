import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Post } from "@/types";
import axios from "axios";
import Posts from "@/components/Posts";

const PostsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!id) return; // if id is not defined, we don't fetch posts

      const response = await axios.get(
        `/api/posts/getPostsByUserId?userId=${id}&page=${page}&limit=5`
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPosts(response.data);
      console.log("PostPage fetched posts:", posts);
    };

    fetchPosts().catch((error) => {
      console.error("Failed to fetch posts", error);
    });
  }, [id, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/posts/${id}?page=${newPage}`);
  };

  if (!id) return <div>Loading...</div>; // show loading screen when id is not defined

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link href={`/`} className="mb-6 text-blue-500 hover:text-blue-700">
        Back to main
      </Link>
      <Posts posts={posts} setPosts={setPosts} />
      <div className="mt-4">
        <button
          className="mr-2 px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsPage;
