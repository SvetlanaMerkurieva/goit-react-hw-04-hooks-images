import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem/ImageGalleryItem';
import s from '../ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <div className={s.content}>
      <ul className={s.imageGallery}>
        {images.map(image => (
          <ImageGalleryItem image={image} onOpenModal={onOpenModal} />
        ))}
      </ul>
    </div>
  );
};
