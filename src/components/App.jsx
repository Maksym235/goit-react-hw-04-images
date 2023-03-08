import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetApi } from './Api/Api';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from 'components/Button/Button';

export function App() {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);
  // const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (imgName === '') {
      return;
    }
    setStatus('pending');
    GetApi(imgName, page)
      .then(response => {
        const data = response.data.hits;
        setImages(state => [...state, ...data]);
        setShowLoadMore(page < Math.ceil(response.data.totalHits / 12));
      })
      .catch(error => setError(error), setStatus('rejected'))
      .finally(setStatus('resolved'));
  }, [imgName, page]);

  const handlerSubmit = imgName => {
    setImgName(imgName);
    setImages([]);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handlerSubmit} />
      {status === 'idle' && <div>enter image name</div>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <div>{error.message}</div>}
      {status === 'resolved' && <ImageGallery images={images} />}
      {showLoadMore && <LoadMoreBtn loadMore={loadMore} />}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
