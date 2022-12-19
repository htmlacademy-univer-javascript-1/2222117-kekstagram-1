import {shuffleArray} from './utils.js';

const TIMEOUT_DELAY = 500;
const MAX_RANDOM_IMG_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

const filters = {
  'filter-default': (data) => data,
  'filter-random': (data) => shuffleArray(data.slice()).slice(0, MAX_RANDOM_IMG_COUNT),
  'filter-discussed': (data) => data.slice().sort((a, b) => b.comments.length - a.comments.length)
};

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const setFilter = (cb) => {
  imgFiltersForm.addEventListener('click', (e) => {
    const button = e.target.closest('.img-filters__button');

    if (button) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');

      if (button.id in filters) {
        cb(filters[button.id]);
      }
    }
  });
};

export {
  showFilters,
  setFilter,
  TIMEOUT_DELAY
};
