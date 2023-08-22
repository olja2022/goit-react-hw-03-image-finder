import { Component } from 'react';
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getFetch } from 'components/services/getFetch';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export const PER_PAGE = 12;
export class App extends Component {
  state = {
    request: '',
    data: [],
    error: null,
    page: 1,
    isShownBtn: false,
    isDisabledBtn: true,
    isLoading: false,
    };

  componentDidUpdate(_, prevState) {
    const { page, request } = this.state;

    if (prevState.request !== request || prevState.page !== page) {
      this.getQuery();
    }
  }

  onSubmit = requestValue => {
    this.setState({ request: requestValue, data: [], page: 1, isShownBtn: false, });
  };

loadMoreBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  getQuery = () => {
    const { PER_PAGE, page, request } = this.state;
    
    this.setState({
      isShownBtn: false,
      isLoading: true,
      error: null,
    });

    getFetch(request, page, PER_PAGE)
      .then(({ totalHits, hits }) => {
        if (totalHits === 0) {
          return toast.info(`Відсутні зображення за запитом "${request}"`);
        }

        if (page === 1)        
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

        if (hits.length < PER_PAGE) {
          this.setState({ isDisabledBtn: true });
          toast.info(
            `Це все. Більше по запиту "${request}" зображень в нас нема`
          );
        }
      })
      .catch(error => {
        toast.error(error.message)
        this.setState({ error: error.message })
      })
  .finally(() => {
       this.setState({ isLoading: false });
      });
  };

  render() {
    const { error, data, isShownBtn, isLoading, isDisabledBtn } =
      this.state;
    
    if (error) {
      return <h1>{`Помилка: ${error}`}</h1>;
    }
    return (
      <>
        {}
        <Searchbar onSubmit={this.onSubmit} />

        {}
        {data.length > 0 && <ImageGallery images={data} />}

        {isLoading && <Loader />}
        {isShownBtn && (
          <Button
            loadMoreBtn={this.loadMoreBtnClick}
            isDisabledBtn={isDisabledBtn}
          />
        )}

        {}
        <ToastContainer newestOnTop={true} autoClose={4000} />
      </>
    );
  }
}
