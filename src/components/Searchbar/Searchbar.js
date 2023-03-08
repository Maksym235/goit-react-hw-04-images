import { useState } from 'react';
import {
  SearchbarSt,
  SearchFormBtn,
  SearchFormInput,
  SearchFormSt,
  SearchFormBtnLabel,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';

const options = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export function Searchbar({ onSubmit }) {
  const [imgName, setImgName] = useState('');

  const onHandelSubmit = evt => {
    evt.preventDefault();
    if (imgName.trim() === '') {
      toast.warn('enter image name', options);
      return;
    }
    onSubmit(imgName);
    setImgName('');
    evt.target.reset();
  };

  const onHandelChange = evt => {
    setImgName(evt.currentTarget.value.toLowerCase());
  };

  return (
    <SearchbarSt className="searchbar">
      <SearchFormSt className="form" onSubmit={onHandelSubmit}>
        <SearchFormBtn type="submit" className="button">
          <SearchFormBtnLabel className="button-label">
            Search
          </SearchFormBtnLabel>
          <AiOutlineSearch />
        </SearchFormBtn>

        <SearchFormInput
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onHandelChange}
        />
      </SearchFormSt>
    </SearchbarSt>
  );
}
