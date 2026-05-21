import { Link, useParams } from "react-router";
import ImageKit from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async (slug: string) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
}

function SinglePostPage() {

  const {slug} = useParams();

  const {isPending, error, data} = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug || ""),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";


  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800" to={""}>
              {data.user?.username || "Unknown"}
            </Link>
            <span>on</span>
            <Link className="text-blue-800" to={""}>
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">
            {data.desc}
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
        {data.img ?
          <ImageKit src={data.img} w={600} className="rounded-2xl" />:
          <ImageKit src="postImg.jpeg" w={600} className="rounded-2xl" />
        }</div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
            consequatur facere explicabo possimus, sint amet nostrum provident
            hic quod aperiam quisquam non qui molestiae rem exercitationem nam
            repellendus dolorem eaque velit praesentium nisi beatae quam cum.
            Maxime sunt repudiandae sed nihil. Commodi enim voluptates deserunt
            inventore, exercitationem alias ipsum deleniti?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab tenetur
            laboriosam molestias, beatae odit sapiente culpa porro laudantium,
            blanditiis asperiores dolore corrupti voluptatum voluptas deleniti
            quidem fuga nihil hic, provident laborum! Rerum dignissimos velit
            nostrum! Sequi assumenda fuga consequatur enim fugit. Error amet
            mollitia eius beatae quam. Quas, ab magni.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab tenetur
            laboriosam molestias, beatae odit sapiente culpa porro laudantium,
            blanditiis asperiores dolore corrupti voluptatum voluptas deleniti
            quidem fuga nihil hic, provident laborum! Rerum dignissimos velit
            nostrum! Sequi assumenda fuga consequatur enim fugit. Error amet
            mollitia eius beatae quam. Quas, ab magni.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab tenetur
            laboriosam molestias, beatae odit sapiente culpa porro laudantium,
            blanditiis asperiores dolore corrupti voluptatum voluptas deleniti
            quidem fuga nihil hic, provident laborum! Rerum dignissimos velit
            nostrum! Sequi assumenda fuga consequatur enim fugit. Error amet
            mollitia eius beatae quam. Quas, ab magni.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab tenetur
            laboriosam molestias, beatae odit sapiente culpa porro laudantium,
            blanditiis asperiores dolore corrupti voluptatum voluptas deleniti
            quidem fuga nihil hic, provident laborum! Rerum dignissimos velit
            nostrum! Sequi assumenda fuga consequatur enim fugit. Error amet
            mollitia eius beatae quam. Quas, ab magni.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab tenetur
            laboriosam molestias, beatae odit sapiente culpa porro laudantium,
            blanditiis asperiores dolore corrupti voluptatum voluptas deleniti
            quidem fuga nihil hic, provident laborum! Rerum dignissimos velit
            nostrum! Sequi assumenda fuga consequatur enim fugit. Error amet
            mollitia eius beatae quam. Quas, ab magni.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab tenetur
            laboriosam molestias, beatae odit sapiente culpa porro laudantium,
            blanditiis asperiores dolore corrupti voluptatum voluptas deleniti
            quidem fuga nihil hic, provident laborum! Rerum dignissimos velit
            nostrum! Sequi assumenda fuga consequatur enim fugit. Error amet
            mollitia eius beatae quam. Quas, ab magni.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab tenetur
            laboriosam molestias, beatae odit sapiente culpa porro laudantium,
            blanditiis asperiores dolore corrupti voluptatum voluptas deleniti
            quidem fuga nihil hic, provident laborum! Rerum dignissimos velit
            nostrum! Sequi assumenda fuga consequatur enim fugit. Error amet
            mollitia eius beatae quam. Quas, ab magni.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user ? 
              <ImageKit
                src={data.user.img}
                className="w-12 h-12 object-cover rounded-full"
                w={48}
                h={48}
              />:
              <ImageKit
                src="userImg.jpeg"
                className="w-12 h-12 object-cover rounded-full"
                w={48}
                h={48}
              />
              }
              <Link to={""} className="text-blue-800">{data.user?.username || "Unknown"}</Link>
            </div>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
            <div className="flex gap-2">
              <Link to={""}>
                <ImageKit src="facebook.svg" />
              </Link>
              <Link to={""}>
                <ImageKit src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data}/>
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to={""} className="underline">
              All
            </Link>
            <Link to={""} className="underline">
              Web Design
            </Link>
            <Link to={""} className="underline">
              Development
            </Link>
            <Link to={""} className="underline">
              Databases
            </Link>
            <Link to={""} className="underline">
              Search Engines
            </Link>
            <Link to={""} className="underline">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id}/>
    </div>
  );
}

export default SinglePostPage;
