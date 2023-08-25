import { useState } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';
// import { nanoid } from 'nanoid';

export default function Searchbar({ onSubmit }) {
  // зберігаємо дані, поки набираємо їх в інпуті
  const [name, setName] = useState('');

  const handleNameChange = evt => {
    setName(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    //    trim() - прибирає пробіли ліворуч/праворуч
    if (name.trim() === '') {
      return alert('Введіть правильну назву');
    }
    onSubmit(name);
    setName('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <CiSearch
              style={{
                fill: '#222222',
                stroke: '#222222',
                width: 25,
                height: 25,
              }}
            />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          value={name}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
