export const sortAlphabetically = (a, b) => {
  a = a[0].toLowerCase();
  b = b[0].toLowerCase();
  return a > b ? 1 : a < b ? -1 : 0;
};
