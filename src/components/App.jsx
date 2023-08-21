import { Component } from 'react';
import './styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    request: '',
  };

  onSubmit = requestValue => {
    this.setState({ request: requestValue });
  };

  render() {
    return (
      <>
        {}
        <Searchbar onSubmit={this.onSubmit} />

        {}
        <ImageGallery request={this.state.request}></ImageGallery>

        {}
        <ToastContainer newestOnTop={true} autoClose={4000} />
      </>
    );
  }
}
