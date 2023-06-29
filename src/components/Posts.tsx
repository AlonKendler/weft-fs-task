// src/components/Posts.tsx
import { Post } from "@/types";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

type Props = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

const Posts: React.FC<Props> = ({ posts, setPosts }) => {
  console.log("posts:", posts);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

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
          <PostItem key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
