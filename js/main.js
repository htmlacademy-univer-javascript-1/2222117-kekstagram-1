function getRandomIntInclusive(min, max) {
  if(min < max || min === max && Number.isInteger(min)){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }    return('Неправильное значение');
}
getRandomIntInclusive(0, 20);

function checkStingLenght(string, maxLenght) {
  if(string.lenght <= maxLenght ? true : false)
}

checkStingLenght('World', 5);