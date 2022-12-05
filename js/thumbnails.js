import { createPhotosDescription } from './photoDescription';

const renderThumbnails = () => {
  const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const picturesList = document.querySelector('.pictures');
  const picturesListFragment = document.createDocumentFragment();
  const createPictures = createPhotosDescription();

  createPictures.forEach(({url, likes, comments}) => {
    const pictures = picturesTemplate.cloneNode(true);
    pictures.querySelector('.picture__img').setAttribute('src', url);
    pictures.querySelector('.picture__likes').textContent = likes;
    pictures.querySelector('.picture__comments').textContent = comments;
    picturesListFragment.appendChild(pictures);
  });

  picturesList.appendChild(picturesListFragment);
};

export {renderThumbnails};
