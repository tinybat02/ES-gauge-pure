export const processData = (buffer: number[]) => {
  // if (buffer.slice(-1)[0] == 0) {
  //   return buffer.slice(-7).reduce((total, elm) => total + elm, 0);
  // }
  // return buffer.slice(-6).reduce((total, elm) => total + elm, 0);
  return buffer.slice(-7).reduce((total, elm) => total + elm, 0);
};
