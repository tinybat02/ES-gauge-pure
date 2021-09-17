export const processData = (buffer: number[], prevStore: number[]) => {
  // if (buffer.slice(-1)[0] == 0) {
  //   return buffer.slice(-7).reduce((total, elm) => total + elm, 0);
  // }
  // return buffer.slice(-6).reduce((total, elm) => total + elm, 0);
  const num = buffer.slice(-7).reduce((total, elm) => total + elm, 0);
  if (prevStore.length == 0) return { num, store: [num] };

  let result = 0;

  const clone = prevStore.slice(-5);
  const tmp = prevStore.slice(-5);

  if (prevStore.length > 0 && prevStore.length < 5) {
    clone.push(num);
  } else {
    clone.shift();
    clone.push(num);
  }

  if (num > 0) result = num;

  if (num == 0) {
    for (let i = tmp.length - 1; i >= 0; i--) {
      if (tmp[i] > 0) {
        result = tmp[i];
        break;
      }
    }
  }

  return { num: result, store: clone };
};
