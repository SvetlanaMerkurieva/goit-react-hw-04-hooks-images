import { useState } from 'react';
import { ReactComponent as AddIcon } from '../../icons/search.svg';
import s from '../Searchbar/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const handleNameChange = ({ currentTarget: { value } }) => {
    setImgName(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imgName.trim() === '') {
      return alert('Введите ключевое слово для поиска');
    }
    onSubmit(imgName);
    setImgName('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>
            <AddIcon fill="blue" width="40px" height="40px" />
          </span>
        </button>

        <input
          className={s.input}
          type="text"
          name="imgName"
          value={imgName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};
