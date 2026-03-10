import { Link } from "react-router";
import ImageKit from "./Image";

function PostListItem() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block xl:w-1/3">
        <ImageKit
          src="postImg.jpeg"
          className="rounded-2xl object-cover"
          w={734}
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={"/blog/test"} className="text-4xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={""} className="text-blue-800">
            John Doe
          </Link>
          <span>on</span>
          <Link to={""} className="text-blue-800">
            Web Design
          </Link>
          <span>2 days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          necessitatibus odit voluptatum aliquam optio excepturi repellendus,
          officiis quia atque velit quidem, eveniet unde eos omnis id molestiae
          eius ad tenetur!
        </p>
        <Link to={"/blog/test"} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostListItem;
