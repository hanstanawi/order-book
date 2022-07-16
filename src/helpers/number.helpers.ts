export const formatNumber = (num: number): string => {
  if (num > 0) {
    return num.toLocaleString('en-US');
  }
  return '0';
};
