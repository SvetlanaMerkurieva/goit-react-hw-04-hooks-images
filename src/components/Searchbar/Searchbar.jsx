import { Component } from 'react';
import { ReactComponent as AddIcon } from '../../icons/search.svg';
import s from '../Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    imgName: '',
  };

  handleNameChange = ({ currentTarget: { value } }) => {
    this.setState({ imgName: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imgName.trim() === '') {
      return alert('Введите ключевое слово для поиска');
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>
              <AddIcon fill="blue" width="40px" height="40px" />
            </span>
          </button>

          <input
            className={s.input}
            type="text"
            name="imgName"
            value={this.state.imgName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
