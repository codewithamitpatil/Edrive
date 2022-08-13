export const Slice = (str, end = 56) => {
  return str.substr(0, end) + "...";
};

export const viewsToString = (value) => {
  var suffixes = ["", "k", "M", "b", "t"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
};
