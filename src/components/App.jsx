import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import style from './styles.module.css';

class App extends Component {

  state = {
    name: '',
  };

  handleFormSubmit = name => {
    this.setState({ name });
  };

  render() {

    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery name={this.state.name} />
      </div>
    );
  }
}

export default App;
