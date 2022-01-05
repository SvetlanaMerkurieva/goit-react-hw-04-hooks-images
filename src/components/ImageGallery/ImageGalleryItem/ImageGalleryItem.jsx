import s from '../ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onOpenModal }) => {
  return (
    <li
      className={s.imageGalleryItem}
      key={image.id}
      onClick={() => onOpenModal(image.id)}
    >
      <img src={image.webformatURL} alt="" />
    </li>
  );
};
