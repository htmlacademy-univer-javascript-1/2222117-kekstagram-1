const template = document.querySelector('#picture').content;
const documentFragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

const clearPictures = () => {
  const pictureList = document.querySelectorAll('.picture');

  pictureList.forEach((picture) => picture.remove());
};

const addThumbnails = (photos) => {
  clearPictures();
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture').dataset.index = photo.id;
    documentFragment.append(picture);
  }
  pictures.append(documentFragment);

};

export {addThumbnails};
