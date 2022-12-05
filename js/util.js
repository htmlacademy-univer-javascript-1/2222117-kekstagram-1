const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const checkStringLength = (checkingString, maxLength) => checkingString.length <= maxLength;

const getCommentId = (commentId) => {
  if (commentId === 0) {
    return 0;
  }
  return commentId - 1;
};

const getDescriptionId = (discriptionId) => {
  if (discriptionId === 0) {
    return 0;
  }
  return discriptionId - 1;
};

export {
  getRandomPositiveInteger,
  getRandomArrayElement,
  checkStringLength,
  getDescriptionId,
  getCommentId
};
