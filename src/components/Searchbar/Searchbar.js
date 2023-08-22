import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

export class Searchbar extends Component {
  // зберігаємо дані, поки набираємо їх в інпуті
  state = {
    name: '',
  };

  handleNameChange = evt => {
    this.setState({ name: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    //    trim() - прибирає пробіли ліворуч/праворуч
    if (this.state.name.trim() === '') {
      return alert('Введіть правильну назву');
    }

    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
