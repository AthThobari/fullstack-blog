import { Link } from "react-router";
import ImageKit from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";

function SinglePostPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut unde
            fuga hic, maiores ex veniam?
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800" to={""}>
              John Doe
            </Link>
            <span>on</span>
            <Link className="text-blue-800" to={""}>
              Web Design
            </Link>
            <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            delectus voluptatum, fuga cumque temporibus harum repellat
            reiciendis autem. Voluptates ipsum dolore culpa beatae ipsam aliquam
            asperiores tempora nulla amet modi!
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <ImageKit src="postImg.jpeg" w={600} className="rounded-2xl" />
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
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
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1>Author</h1>
          <div className="">
            <ImageKit src="userImg.jpeg" className="w-12 h-12 object-cover rounded-full" w={48} h={48}/>
            <Link to={""}>John Doe</Link>
            <p>Lorem ipsum dolor sit amet.</p>
            <div className="flex gap-2">
              <Link to={""}>
              <ImageKit src="facebook.svg" />
              </Link>
              <Link to={""}>
              <ImageKit src="instagram.svg" />
              </Link>
            </div>
              <PostMenuActions />

          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
