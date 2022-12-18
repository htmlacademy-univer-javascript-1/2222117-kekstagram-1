const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const documentFragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

const renderThumbnails = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const picture = picturesTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture').dataset.index = photo.id;
    documentFragment.append(picture);
  }
  pictures.append(documentFragment);

};

export {renderThumbnails};
