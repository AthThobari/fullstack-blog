import { useAuth, useUser } from "@clerk/clerk-react";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import type React from "react";

const fetchComments = async (postId: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`,
  );
  return res.data;
};

type Props = {
  postId: string;
};

function Comments({ postId }: Props) {
  const {user} = useUser()
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId || ""),
  });

  type CommentData = {
    desc: string;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment: CommentData) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response!.data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const desc = formData.get("desc");

    if (!desc) {
      toast.error("Comment cannot be empty");
      return;
    }

    const data = {
      desc: desc.toString(),
    };

    mutation.mutate(data);

    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 "
      >
        <div className="flex items-center justify-between gap-8 w-full">
          <textarea
            name="desc"
            className="w-full p-4 rounded-xl bg-slate-50"
            placeholder="Write a comment..."
          />
          <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
            Send
          </button>
        </div>
      </form>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Error loading comments!"
      ) : (
        <>
        {mutation.isPending && (
            <Comment comment={{
              desc: `${mutation.variables.desc} (Sending...)`,
              createdAt: new Date().toString(),
              user: {
                 img: user?.imageUrl,
                 username: user?.username || ""
              }
            }} postId={postId}/>
        )
        }

          {data.map((comment: any) => (
            <Comment key={comment._id} comment={comment} postId={postId}/>
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
