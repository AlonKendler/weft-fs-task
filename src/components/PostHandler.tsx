//src/component/PostsHandler.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Post } from "@/types";
import Posts from "./Posts";

type PostsHandlerProps = {
  id: string;
  initialPosts: Post[];
  page: number;
};

export const PostsHandler = ({ id, initialPosts, page }: PostsHandlerProps) => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (newPage: number) => {
    router.push(`/posts/${id}?page=${newPage}`);
  };

  return (
    <Posts
      posts={posts}
      setPosts={setPosts}
      handlePageChange={handlePageChange}
      page={page}
    />
  );
};

export default PostsHandler;
