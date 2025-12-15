import { useUser } from "@clerk/clerk-react";

function Write() {
  const {isLoaded, isSignedIn} = useUser();

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="">You should login!</div>;
  }
  return (
    <div>
      <h1>Create a New Post</h1>
      <form>
        <button>Add a cover image</button>
        <input type="text" placeholder="My Awwesome Story"/>
        <div className="">
          <label htmlFor="">Choose a category:</label>
          <select name="cat" id="">
            <option value="general">General</option>
            <option value="web design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea name="des" placeholder="A Shor Description"/>
      </form>
    </div>
  )
}

export default Write