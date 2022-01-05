import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import shortid from 'shortid';

export const ImageGalleryItem = ({ images, onOpenModal }) => {
  return (
    <>
      {images.map(image => (
        <li
          className={s.imageGalleryItem}
          key={shortid()}
          onClick={() => onOpenModal(image.id)}
        >
          <img src={image.webformatURL} alt="" />
        </li>
      ))}
    </>
  );
};
