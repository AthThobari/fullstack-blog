import { Image, ImageKitProvider } from "@imagekit/react";

interface ImageKitProps {
  src: string;
  className?: string;
  alt?: string;
  w?: number;
  h?: number;
  quality?: number;
}

const ImageKit = ({
  src,
  className,
  alt,
  w,
  h,
  quality = 70,
}: ImageKitProps) => {
  return (
    <ImageKitProvider urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}>
      <Image
        src={src}
        className={className}
        alt={alt ?? "image"}
        transformation={[
          {
            width: w,
            height: h,
            quality,
          },
        ]}
      />
    </ImageKitProvider>
  );
};

export default ImageKit;
