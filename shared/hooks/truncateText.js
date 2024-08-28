const truncateText = (text) => {
  const maxLength = 500;
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};
