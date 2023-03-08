import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32809248-e617eb740123e44583fb94c77';

export function GetApi(imgName, page) {
  const options = {
    params: {
      key: KEY,
      page: page,
      q: imgName,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.get(`${BASE_URL}`, options);
}
