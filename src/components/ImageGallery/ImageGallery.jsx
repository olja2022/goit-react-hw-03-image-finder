import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { getFetch } from 'components/services/getFetch';

export class ImageGallery extends Component {
  state = {
    data: [],
    error: null,
    status: '',
    page: 1,
    isShownBtn: false,
    isDisabledBtn: true,
    isLoading: false,
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const { request } = this.props;
    const { page } = this.state;

    if (prevProps.request !== request) {
      this.setState({ data: [], page: 1, isShownBtn: false });
      this.getQuery(1);
    }

    else {
      if (page !== prevState.page && page !== 1) {
        this.getQuery(page);
      }
    }
  }

  getQuery = currentPage => {
    const { perPage } = this.state;
    const { request } = this.props;

    this.setState({
      isShownBtn: false,
      isLoading: true,
    });

    getFetch(request, currentPage, perPage)
      .then(({ totalHits, hits }) => {
        if (totalHits === 0) {
          return toast.info(`Відсутні зображення за запитом "${request}"`);
        }

        if (currentPage === 1)
          toast.success(
            `Знайдено ${totalHits} результат(ів) по запиту "${request}"`
          );

        this.setState(prevState => {
          return {
            data: [...prevState.data, ...hits],
            isShownBtn: true,
            isDisabledBtn: false,
            };
        });

        if (hits.length < perPage) {
          this.setState({ isDisabledBtn: true });
          toast.info(
            `Це все. Більше по запиту "${request}" зображень в нас нема`
          );
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
       this.setState({ isLoading: false });
      });
  };

  loadMoreBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { status, error, data, isShownBtn, isLoading, isDisabledBtn } =
      this.state;

    if (status === 'rejected') {
      return <h1>{`Помилка: ${error.message}`}</h1>;
    }

   return (
      <>
        {data.length !== 0 && (
          <ul className="ImageGallery">
            {data.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
        )}
        {isLoading && <Loader />}
        {isShownBtn && (
          <Button
            loadMoreBtn={this.loadMoreBtnClick}
            isDisabledBtn={isDisabledBtn}
          />
        )}
      </>
    );
   }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
};
