// src/components/Posts.tsx
import { Post } from "@/types";
import { useState } from "react";

type Props = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  handlePageChange: (newPage: number) => void;
  page: number;
};

const Posts: React.FC<Props> = ({
  posts,
  setPosts,
  handlePageChange,
  page,
}) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [search, setSearch] = useState("");

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch("/api/posts/deletePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      // Update the posts in the state
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (error) {
      console.error(`Failed to delete post: ${error}`);
    }
  };
  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    if (search !== "") {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredPosts(posts);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search Posts"
        className="mb-6 p-2 border border-gray-400 rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 relative max-w-[300px]"
          >
            <button
              onClick={() => handleDelete(post.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-900"
            >
              X {/* Replace this with your delete icon */}
            </button>
            <div>
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
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

export default Posts;
