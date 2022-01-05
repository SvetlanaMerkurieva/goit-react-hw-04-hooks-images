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
    setImgName(imgName);
    setPage(1);
  };

  useEffect(() => {
    if (imgName === '') {
      return;
    }
    try {
      const images = fetchImages(imgName, page);

      if (images) {
        return (
          setImages(prevState => prevState.concat(images)) && setVisible(true)
        );
      }
    } catch (e) {
      return new Error(`Нет изображений по запросу ${imgName}`);
    } finally {
      setLoading(false);
    }
  }, [imgName, page]);

  const onButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = imageId => {
    const currentImage = images.find(image => image.id === imageId);
    return setLargeImage(currentImage.largeImageURL) && setShowModal(true);
  };

  const onCloseModal = () => {
    return setShowModal(true);
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

/*class App extends Component {
  state = {
    imgName: '',
    images: [],
    largeImage: '',
    page: 1,
    loading: false,
    visible: false,
    error: null,
    showModal: false,
  };

  handleFormSubmit = imgName => {
    this.setState({ imgName, page: 1 });
  };

  async componentDidUpdate(_prevProps, prevState) {
    if (prevState.imgName !== this.state.imgName) {
      this.setState({ images: [], loading: true, visible: false });
      try {
        const images = await fetchImages(this.state.imgName, this.state.page);

        if (images) {
          return this.setState({
            images,
            visible: true,
          });
        }
      } catch (e) {
        this.setState({ error: e });
        return new Error(`Нет изображений по запросу ${this.state.imgName}`);
      } finally {
        this.setState({ loading: false });
      }
    }
    if (
      prevState.imgName === this.state.imgName &&
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, visible: false });
      try {
        const images = await fetchImages(this.state.imgName, this.state.page);

        this.setState(prevState => ({
          images: prevState.images.concat(images),
          visible: true,
        }));
      } catch (e) {
        this.setState({ error: e });
        return new Error(`Нет изображений по запросу ${this.state.imgName}`);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onOpenModal = imageId => {
    const currentImage = this.state.images.find(image => image.id === imageId);
    this.setState({ largeImage: currentImage.largeImageURL, showModal: true });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    const { images, showModal, largeImage, loading, visible } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {visible && <Button onClick={this.onButtonClick} />}
        {loading && <LoaderHere />}
        {showModal && (
          <Modal imageLarge={largeImage} onClose={this.onCloseModal} />
        )}
      </div>
    );
  }
}

export default App;*/
