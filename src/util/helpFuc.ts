export const processData = (buffer: number[]) => {
  //   if (buffer.length == 1) return buffer[0];
  //   if (buffer.length == 2) {
  //     return buffer[0] > buffer[1] ? buffer[0] : buffer[1];
  //   }
  //   if (buffer.length > 2) return buffer[buffer.length - 2];
  //   return 0;
  if (buffer.slice(-1)[0] == 0) {
    return buffer.slice(-7).reduce((total, elm) => total + elm, 0);
  }
  return buffer.slice(-6).reduce((total, elm) => total + elm, 0);
};
