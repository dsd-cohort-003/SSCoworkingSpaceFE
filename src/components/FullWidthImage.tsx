import { useState } from 'react';
import { Spinner } from './Spinner';

interface FullWidthImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };
  return (
    <>
      {!imageLoaded && !imageError && <Spinner />}
      {imageError ? (
        <img src="" alt="" />
      ) : (
        <img
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </>
  );
};

export default FullWidthImage;
