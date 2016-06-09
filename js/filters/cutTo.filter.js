export default
[function() {
  return function(str, size) {
    if (!str.length) {
      return;
    }

    if (isNaN(size)) {
      return str;
    }
    if (str.length > size) {
      return str.slice(0, size - 3) + '...';
    }
  };
}];
