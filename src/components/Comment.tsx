import ImageKit from "./Image"

function Comment() {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <ImageKit src="userImg.jpeg" className="w-10 h-10 rounded-full object-cover" w={"40"}/>
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima soluta placeat voluptatibus ut tempore aut aperiam, similique earum beatae voluptatem harum, distinctio vel at.</p>
      </div>
    </div>
  )
}

export default Comment