import { Link } from "react-router";
import ImageKit from "./Image";
import { format } from "timeago.js";

type User = {
  username: string;
};

type Post = {
  _id: string;
  category: string;
  content: string;
  img: string;
  createdAt: string;
  desc: string;
  isFeatured: boolean;
  title: string;
  updatedAt: string;
  user: User;
  visit: number;
  slug: string;
};

type Props = {
  post: Post;
};

function PostListItem({ post }: Props) {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-4">
      {post.img ? (
        <div className="md:hidden xl:block xl:w-1/3">
          <ImageKit
            src={post.img}
            className="rounded-2xl object-cover"
            w={734}
          />{" "}
        </div>
      ) : (
        <div className="md:hidden xl:block xl:w-1/3">
          <ImageKit
            src="postImg.jpeg"
            className="rounded-2xl object-cover"
            w={734}
          />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/blog/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={""} className="text-blue-800">
            {post.user ? post.user.username : "unknown"}
          </Link>
          <span>on</span>
          <Link to={`/blog/${post.category}`} className="text-blue-800">
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="underline text-blue-800 text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostListItem;
