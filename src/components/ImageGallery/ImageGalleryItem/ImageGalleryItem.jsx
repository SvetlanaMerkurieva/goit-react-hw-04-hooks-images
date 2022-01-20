import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import shortid from 'shortid';

export const ImageGalleryItem = ({ image, onOpenModal }) => {
  return (
    <li
      className={s.imageGalleryItem}
      key={shortid()}
      onClick={() => onOpenModal(image.id)}
    >
      <img src={image.webformatURL} alt="" />
    </li>
  );
};
