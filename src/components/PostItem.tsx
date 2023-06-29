import { Post } from "@/types";
import { FaTrash } from "react-icons/fa";

type PostItemProps = {
  post: Post;
  handleDelete: (id: number) => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, handleDelete }) => {
  return (
    <div
      key={post.id}
      className="bg-white rounded-lg shadow-md p-6 relative max-w-[300px]"
    >
      <button
        onClick={() => handleDelete(post.id)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-900"
      >
        <FaTrash /> {/* Here's your trash bin delete icon */}
      </button>
      <div>
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600">{post.body}</p>
      </div>
    </div>
  );
};

export default PostItem;
