import { Image } from "@imagekit/react";

type ImageKitProps = {
    src: string
    className?: string
    alt?: string
    w?: number | `${number}`
    h?: number | `${number}`
}
function ImageKit({src, className, alt = "", h, w}: ImageKitProps) {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={src}
      alt={alt}
      lqip={{active: true, quality: 20}}
      className={className}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        }
      ]}
    />
  );
}

export default ImageKit;
