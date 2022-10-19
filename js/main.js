const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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
let descriptionId = getRandomPositiveInteger(1, 25); // не должен повторятся
let commentsId = 0; // не должен повторятся
let leavedLikes = getRandomPositiveInteger(15, 200);

function checkStringLength (string, length) {
  return string.length <= length;
}

const randomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = () => ({
  id: commentsId++,
  avatar: `img/avatar${getRandomPositiveInteger(1, 6)}.svg`,
  message: randomArrayElement(MESSAGES),
  name: randomArrayElement(NAMES)
});

const createDescription = () => ({
  id: descriptionId++,
  url: `photos${descriptionId++}.jpg`,
  description: randomArrayElement(DESCRIPTION),
  likes:leavedLikes,
  comment: Array.from({length: 5}, createComment),
});

const photos = Array.from({length: 25}, createDescription);
photos();
