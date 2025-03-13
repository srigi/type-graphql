import { forwardRef } from 'preact/compat';

function computeHeight(width: number, ratio: number) {
  return Math.floor((width / ratio) * 100) / 100;
}

function cloudinaryLoader(src: string, width: number, quality: number) {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${[
    'f_auto',
    'c_limit',
    `w_${width}`,
    `q_${quality || 'auto'}`,
  ].join(',')}/${src}`;
}

type Props = {
  className?: string;
  image: {
    alt: string;
    AR: number;
    publicId: string;
  };
  width: number;
  quality?: number;
};

export function CloudImage({ className, image: { alt, AR, publicId }, width, quality = 67 }: Props) {
  return <img className={className} height={computeHeight(width, AR)} src={cloudinaryLoader(publicId, width, quality)} alt={alt} />;
}
