import {isEscapeKey} from './utils.js';
import {addSmartSlider} from './slider.js';
import {sendRequest} from './api.js';

const TAG_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const COUNT_TAGS = 5;
const STEP_SCALE = 25;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const smartSliderFilters = addSmartSlider('none', effectLevelSlider, effectLevelValue);

scaleControlSmaller.addEventListener('click', () => {
  let percent = Number(scaleControlValue.value.slice(0, -1));
  if (percent > STEP_SCALE) {
    percent = percent - STEP_SCALE;
    scaleControlValue.value = `${percent}%`;
  }
  imgPreview.setAttribute('style', `transform: scale(${percent / 100})`);
});

scaleControlBigger.addEventListener('click', () => {
  let percent = Number(scaleControlValue.value.slice(0, -1));
  if (percent < 100) {
    percent = percent + STEP_SCALE;
    scaleControlValue.value = `${percent}%`;
  }
  imgPreview.setAttribute('style', `transform: scale(${percent / 100})`);
});

const applyChanges = (value) => {
  if (imgPreview.classList.length !== 0) {
    imgPreview.classList.remove(imgPreview.classList[0]);

  }
  smartSliderFilters.setCurrentFilter(value);

  imgPreview.classList.add(`effects__preview--${value}`);

  effectLevelSlider.noUiSlider.updateOptions(smartSliderFilters.getOptions());
  imgPreview.style.filter = smartSliderFilters.getStyles();
};

effectsList.addEventListener('click', (e) => {
  const effectsItems = e.target.closest('.effects__item');
  if (effectsItems) {
    const value = effectsItems.querySelector('.effects__radio').value;
    applyChanges(value);
  }
});

const checkIfHashtagsRepeated = () => {
  const hashTagsArray = textHashtags.value.toLowerCase().split(' ');
  const hashTagsSet = new Set(hashTagsArray);

  if (hashTagsSet.size !== hashTagsArray.length) {
    return false;
  }
  return true;
};

const checkMaxHashtagsCount = () => {
  const hashTagsArray = textHashtags.value.toLowerCase().split(' ');

  if (hashTagsArray.length > COUNT_TAGS) {
    return false;
  }
  return true;
};

const checkIfHashtagCorrect = () => {
  if (textHashtags.value === '') {
    return true;
  }
  const hashTagsArray = textHashtags.value.toLowerCase().split(' ');
  return hashTagsArray.every((hashtag) => TAG_REGEX.test(hashtag));
};

pristine.addValidator(textHashtags, checkIfHashtagsRepeated, 'Хештеги регистронезависимы и не должны повторяться');
pristine.addValidator(textHashtags, checkMaxHashtagsCount, `Максимальное число хештегов - ${COUNT_TAGS}`);
pristine.addValidator(textHashtags, checkIfHashtagCorrect, 'Один из введённых вами хештегов некорректен');

const closeUploadFileForm = (e = null, clear = true) => {
  if (e === null || (isEscapeKey(e) && document.activeElement !== textHashtags && document.activeElement !== textDescription) || e.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadFileForm);
    uploadCancel.removeEventListener('click', closeUploadFileForm);

    if (clear) {
      imgUploadForm.reset();
      applyChanges('none');
    }
  }
};

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const file = uploadFile.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    imgPreview.src = evt.target.result;
  };
  reader.readAsDataURL(file);
  imgPreview.setAttribute('style', 'transform: scale(1)');
  document.addEventListener('keydown', closeUploadFileForm);
  uploadCancel.addEventListener('click', closeUploadFileForm);
});

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendRequest(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onError();
          unblockSubmitButton();
        },
        'POST',
        new FormData(imgUploadForm)
      );
    }
  });
};

noUiSlider.create(effectLevelSlider, smartSliderFilters.getOptions());

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgPreview.style.filter = smartSliderFilters.getStyles();
});

export {
  setUserFormSubmit,
  closeUploadFileForm,
};
