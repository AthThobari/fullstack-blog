import { useAuth, useUser } from "@clerk/clerk-react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function PostMenuActions({ post }: any) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data
    },
  });

  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const isSaved =
    savedPosts?.some((p: string) => p === post._id) ?? false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      navigate("/blog");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });

  const queryClient = useQueryClient();

    const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`,
        {
          postId: post._id,
        }, 
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"]});
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });

      const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature`,
        {
          postId: post._id,
        }, 
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug]});
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });

    const handleDelete = () => {
    deleteMutation.mutate();
  };

    const handleSave = () => {
      if (!user) {
        return navigate("/blog/login")
      }
      saveMutation.mutate();
  };
    const handlefeature = () => {
      featureMutation.mutate();
  };


  return (
    <div className="mt-8 mb-4 text-sm font-medium">
      <h1 className="mb-4 text-sm font-medium">Actions</h1>
      {isPending ? (
        "Loading"
      ) : error ? (
        "Saved post fetching failed!"
      ) : (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleSave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width={"20px"}
            height={"20px"}
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth={2}
              fill={saveMutation.isPending ? isSaved ? "none" : "black" : isSaved ? "black" : "none"}
            /> 
          </svg>
          <span>Save this Post</span>
          {saveMutation.isPending && <span className="text-xs">(in progress)</span>}
        </div>
      )}
      {
        isAdmin && (
          <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handlefeature}>
            <svg 
            xmlns="http//www.w3.org/2000/svg"
            viewBox="0 0 49 49"
            width="20px"
            height={"20px"}
            >
              <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth={"2"}
              fill={
                featureMutation.isPending ? post.isFeatured ? "none" : "black" : post.isFeatured ? "black" : "none"
              }
              />
            </svg>
            <span>Feature</span>
          {featureMutation.isPending && <span className="text-xs">(in progress)</span>}
          </div>
        )
      }
      {user && (post.user?.username === user.username || isAdmin) && (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="red"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <span>Delete this Post</span>
          {deleteMutation.isPending && <span className="text-xs">(in progress)</span>}
        </div>
      )}
    </div>
  );
}

export default PostMenuActions;
