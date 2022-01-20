import { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { fetchImages } from '../../services/pixabayApi';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { LoaderHere } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import s from './App.module.css';

export default function App() {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = imgName => {
    setImages([]);
    setImgName(imgName);
  };

  useEffect(() => {
    async function getImages() {
      if (imgName === '') return;
      setLoading(true);
      setVisible(false);

      try {
        const images = await fetchImages(imgName, page);
        setImages(prevState => prevState.concat(images));
        setVisible(true);
      } catch (e) {
        return new Error(`Нет изображений по запросу ${imgName}`);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [imgName, page]);

  const onButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = imageId => {
    const currentImage = images.find(image => image.id === imageId);
    setLargeImage(currentImage.largeImageURL);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} onOpenModal={onOpenModal} />}
      {visible && <Button onClick={onButtonClick} />}
      {loading && <LoaderHere />}
      {showModal && <Modal imageLarge={largeImage} onClose={onCloseModal} />}
    </div>
  );
}
