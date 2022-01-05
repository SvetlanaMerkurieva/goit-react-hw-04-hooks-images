import s from '../Button/Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      <span>Загрузить еще</span>
    </button>
  );
};
