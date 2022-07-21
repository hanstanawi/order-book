/**
 * @description Format number to have thousand comma separator (eg: 23,231)
 * @param {number} num Input number
 * @returns {string} Formatted number as string
 */
export const formatNumber = (num: number): string => {
  if (num > 0) {
    return num.toLocaleString('en-US');
  }
  return '0';
};

/**
 * @description Format number to have decimal comma (eg: 23,231.0)
 * @param {number} num Input number
 * @returns {string} Formatted number as string
 */
export const formatPrice = (num: number): string => {
  if (num > 0) {
    return num.toLocaleString('en-US', {
      useGrouping: true,
      minimumFractionDigits: 1,
    });
  }
  return '0';
};
