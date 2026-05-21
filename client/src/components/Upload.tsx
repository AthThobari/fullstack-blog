import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, type ReactNode } from "react";
import { toast } from "react-toastify";

type Props = {
  children?: ReactNode;
  type?: string;
  setProgress: (progress: number) => void;
  setData: (url: string) => void;
};


  const authenticator = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/upload-auth`,
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      const { signature, expire, token } = data;

      return { signature, expire, token };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Upload auth failed");
    }
  };

function Upload({children, type = "default", setProgress, setData }: Props) {
  const publicKey = import.meta.env.VITE_IK_PUBLIC_KEY;
  const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;
  const ref = useRef<HTMLInputElement | null>(null)

  const onError = (err: unknown) => {
    console.log(err);
    toast.error("Image upload failed");
  };

  type UploadResponse = {
    url: string;
  };

  const onSuccess = (res: UploadResponse) => {
    console.log(res);
    setData(res.url);
  };

  type UploadProgressResponse = {
    loaded: number;
    total: number;
  };

  const onUploadProgress = (progress: UploadProgressResponse) => {
    console.log(progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName={true}
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="" onClick={()=>ref.current?.click()}>{children}</div>
    </IKContext>
  );
}

export default Upload;
