import {isEscapeKey} from './utils.js';

const bigPictureSection = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPictureSection.querySelector('.likes-count');
const commentsCount = bigPictureSection.querySelector('.comments-count');
const commentCurrent = bigPictureSection.querySelector('.comment-current');
const socialComments = bigPictureSection.querySelector('.social__comments');
const socialCaption = bigPictureSection.querySelector('.social__caption');
const commentsLoader = bigPictureSection.querySelector('.comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const onModalEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    bigPictureSection.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const closeModal = (evt) => {
  if (isEscapeKey(evt) || evt.type === 'click') {
    bigPictureSection.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeModal);
    bigPictureCancel.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onModalEscKeydown);
  }
  socialComments.textContent = '';
  commentCurrent.textContent = 0;
  commentsLoader.classList.remove('hidden');
};

const addComment = (image) => {
  const comment = image.comments[Number(commentCurrent.textContent)];
  socialComments.insertAdjacentHTML('beforeend', `
    <li class="social__comment">
      <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>`);
};

const addFiveComments = (image) => {
  for(let i = 0; i < 5; i++) {
    if (Number(commentCurrent.textContent) < Number(commentsCount.textContent)) {
      addComment(image);
      commentCurrent.textContent = Number(commentCurrent.textContent) + 1;
    }
    else {
      commentsLoader.classList.add('hidden');
      break;
    }
  }
};

const openModal = (image) => {
  bigPictureSection.classList.remove('hidden');
  commentsCount.textContent = image.comments.length;
  addFiveComments(image);
  commentsLoader.addEventListener('click', () => {
    addFiveComments(image);
  });

  bigPictureImg.src = image.url;
  likesCount.textContent = image.likes;
  bigPictureImg.alt = image.description;
  socialCaption.textContent = image.description;
  bigPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeModal);
  bigPictureCancel.addEventListener('click', closeModal);
};

const thumbnailClickHandler = (data) => {
  pictures.addEventListener('click', (e) => {
    const picture = e.target.closest('.picture');
    if (picture) {
      openModal(data[picture.dataset.index]);
    }
  });
};
export {thumbnailClickHandler, closeModal};
