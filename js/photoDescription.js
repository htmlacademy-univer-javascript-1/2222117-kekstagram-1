import { getRandomPositiveInteger, getRandomArrayElement, getDescriptionId, getCommentId } from './util.js';

const NAMES = [
  'Родион',
  'Софья',
  'Ульяна',
  'Анна',
  'Артём',
  'Серафима',
  'Роман',
  'Егор',
  'Артемий',
  'Вероника',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTION = [
  'Выдающаяся фотография – это глубина чувств, а не глубина резкости',
  'Вы не фотографируете, вы создаете',
  'Нет никаких правил для хороших фотографий, есть только хорошие фотографии',
  'Красоту можно подметить во всем, виденье и составление красоты это то, что отделяет снимок от фотографии'
  ,
  'Конечно, все дело в удаче',
  'В каждой фотографии всегда есть два человека: фотограф и зритель',
  'Меня не интересует фотография сама по себе. Я лишь хочу захватить минутную часть реальности',
  'Мир просто не укладывается в формат 35-мм камеры',
  'Фотографии – это открытые двери в прошлое, но они позволяют заглянуть в будущее',
];
const PUTTED_LIKES = getRandomPositiveInteger(15, 200);
const AMOUNT_OF_PHOTOS = 25;
const AMOUNT_OF_COMMENTS = 5;
const DESCRIPTION_ID = 25;
const COMMENT_ID = 25;

const createComment = () => ({
  id: getCommentId(COMMENT_ID),
  avatar: `img/avatar${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createDescription = () => ({
  id: getDescriptionId(DESCRIPTION_ID),
  url: `photos${getDescriptionId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: PUTTED_LIKES,
  comment: Array.from({length: AMOUNT_OF_COMMENTS}, createComment),
});

const createPhotosDescription = () => Array.from({length: AMOUNT_OF_PHOTOS}, createDescription);

export {createPhotosDescription};
