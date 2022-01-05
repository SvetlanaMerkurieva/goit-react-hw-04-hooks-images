import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { fetchImages } from '../../services/pixabayApi';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { LoaderHere } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import s from './App.module.css';

class App extends Component {
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

export default App;
