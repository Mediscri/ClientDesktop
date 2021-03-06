import color from './color';

const extractNum = text => parseInt(text.replace(/(\d+)rem$/, '$1'), 10);

const calcSize = formula => {
  const list = formula.split(' ');
  if (list.length < 2) {
    return formula;
  }

  let result = extractNum(list[0]);
  for (let i = 2; i < list.length; i += 2) {
    switch (list[i - 1]) {
      case '+':
        result += extractNum(list[i]);
        break;
      case '-':
        result -= extractNum(list[i]);
        break;
      default:
        break;
    }
  }
  return `${result}rem`;
};

const accuracyToColor = (accuracy: number) => {
  if (accuracy < 33) {
    return color.red;
  } else if (accuracy < 66) {
    return color.yellow;
  } else if (accuracy < 100) {
    return color.green;
  } else {
    return color.black;
  }
};

export default { calcSize, accuracyToColor };
