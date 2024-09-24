export const neutral = (opacity: number, isFromBlack = false) =>
  isFromBlack ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
