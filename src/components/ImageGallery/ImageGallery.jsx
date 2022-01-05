import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem/ImageGalleryItem';
import s from '../ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <div className={s.content}>
      <ul className={s.imageGallery}>
        <ImageGalleryItem images={images} onOpenModal={onOpenModal} />
      </ul>
    </div>
  );
};
