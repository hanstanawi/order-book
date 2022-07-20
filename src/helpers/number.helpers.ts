export const formatNumber = (num: number): string => {
  if (num > 0) {
    return num.toLocaleString('en-US');
  }
  return '0';
};

export const formatPrice = (num: number): string => {
  if (num > 0) {
    return num.toLocaleString('en-US', {
      useGrouping: true,
      minimumFractionDigits: 1,
    });
  }
  return '0';
};
