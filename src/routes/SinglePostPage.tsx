import { Link } from "react-router"
import ImageKit from "../components/Image"

function SinglePostPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut unde fuga hic, maiores ex veniam?</h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800" to={""}>John Doe</Link>
          <span>on</span>
          <Link className="text-blue-800" to={""}>Web Design</Link>
          <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt delectus voluptatum, fuga cumque temporibus harum repellat reiciendis autem. Voluptates ipsum dolore culpa beatae ipsam aliquam asperiores tempora nulla amet modi!</p>
        </div>
        <div className="hidden lg:block w-2/5">
          <ImageKit src="postImg.jpeg"/>
        </div>
      </div>
      {/* content */}
      <div className=""></div>
    </div>
  )
}

export default SinglePostPage