import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import style from './styles.module.css';

export default function App() {
  const [name, setName] = useState('');

  // function handleFormSubmit(name) {
  //   return setName(name);
  // }

  const handleFormSubmit = name => {
    setName(name);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery name={name} />
    </div>
  );
}
