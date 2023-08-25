import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import Button from '../Button/Button';
import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37518101-4c8b383dea2a151ad4bc810e7';

export default function ImageGallery({ name }) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [img, setImg] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' - запита ще немає

  useEffect(() => {
    if (!name) {
      return;
    }

    const fetchImageFunction = async () => {
      setPage(1);
      setTotal(0);
      setImg([]);
      setStatus('pending');

      fetchImage({
        page: 1,
      })
        .then(({ hits, total }) => {
          setImg([...hits]);
          setTotal(total);
          setStatus('resolved');
        })
        .catch(errorMessage => setStatus('rejected'));
    };

    fetchImageFunction();
  }, [name]);

  useEffect(() => {
    const fetchImageFunction = async () => {
      fetchImage({
        page: page,
      })
        .then(({ hits }) => {
          setImg(prevImg => [...prevImg, ...hits]);
        })
        .catch(errorMessage => setStatus('rejected'));
    };
    fetchImageFunction();
  }, [page]);

  const onClickButtonMore = () => {
    setPage(prevPage => prevPage + 1);
    // fetchImage();
  };

  const fetchImage = async ({ page }) => {
    const searchQuery = {
      q: name,
      per_page: 12,
      image_type: 'photo',
      page: page,
      orientation: 'horizontal',
    };

    const response = await fetch(
      `${BASE_URL}?q=${searchQuery.q}&page=${searchQuery.page}&key=${API_KEY}&image_type=${searchQuery.image_type}&orientation=${searchQuery.orientation}&per_page=${searchQuery.per_page}`
    );

    if (!response.ok) {
      throw new Error(`No search pictures ${name}`);
    }

    const img = await response.json();

    return img;
  };

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
    return <p>{setError(error)}</p>;
  }

  // 'resolved' - успішний запит
  if (status === 'resolved') {
    return (
      <>
        <ul className={css.ImageGallery}>
          {img.map(elem => (
            <li key={elem.id} className={css.ImageGalleryItem}>
              <ImageGalleryItem nameSearch={elem} />
            </li>
          ))}
        </ul>

        {img.length < 12 || total === img.length ? null : (
          <Button onclick={onClickButtonMore} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  name: PropTypes.string.isRequired,
};
