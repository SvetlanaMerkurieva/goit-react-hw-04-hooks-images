import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem/ImageGalleryItem';
import shortid from 'shortid';
import s from '../ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <div className={s.content}>
      <ul className={s.imageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={shortid()}
            image={image}
            onOpenModal={onOpenModal}
          />
        ))}
      </ul>
    </div>
  );
};
