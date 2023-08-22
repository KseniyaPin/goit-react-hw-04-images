import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import Button from '../Button/Button';
import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37518101-4c8b383dea2a151ad4bc810e7';

export class ImageGallery extends Component {
  state = {
    page: 1,
    total: 0,
    img: [],
    error: null,
    status: 'idle', // 'idle' - запита ще немає
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      try {
        this.setState({ page: 1, total: 0, img: [], status: 'pending' });

        const { total, hits } = await this.fetchImage();

        this.setState({ img: hits, total, status: 'resolved' });
      } catch {
        this.setState({ status: 'rejected' });
      }
    }

    if (prevState.page !== this.state.page) {
      const { hits } = await this.fetchImage();
      if (prevProps.name !== this.props.name) {
        this.setState({ img: hits });
        return;
      }
      this.setState({ img: [...prevState.img, ...hits] });
    }
  }

  fetchImage = async () => {
    const search = {
      q: this.props.name,
      per_page: 12,
      image_type: 'photo',
      page: this.state.page,
      orientation: 'horizontal',
    };

    const response = await fetch(
      `${BASE_URL}?q=${search.q}&page=${search.page}&key=${API_KEY}&image_type=${search.image_type}&orientation=${search.orientation}&per_page=${search.per_page}`
    );

    if (!response.ok) {
      throw new Error(`No search pictures ${this.props.name}`);
    }

    const img = await response.json();

    return img;
  };

  onClickButtonMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.fetchImage();
  };

  render() {
    const { img, total, status } = this.state;

    // 'idle' - запиту ще немає
    if (status === 'idle') {
      return;
    }

    // 'pending' - пішов запит
    if (status === 'pending') {
      return <Loader />;
    }

    // 'rejected' - запит із помилкою
    if (status === 'rejected') {
      return <p>{this.state.error.message}</p>;
    }

    // 'resolved' - успішний запит
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {img.map(elem => (
              <li key={elem.id} className={css.ImageGalleryItem}>
                <ImageGalleryItem name={elem} />
              </li>
            ))}
          </ul>

          {img.length < 12 || total === img.length ? null : (
            <Button onclick={this.onClickButtonMore} />
          )}
        </>
      );
    }
  }
}
