export const getUrlQuerysection = () => {
  let queries = window.location.search;
  return queries;
};

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included
};

// this function removes null, undefined and empty string values from an object
export function cleanObject(obj, keys = []) {
  for (let propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === "" ||
      obj[propName] === "None"
    ) {
      delete obj[propName];
    }
  }
  // delete key name specified
  keys?.forEach((key) => {
    delete obj[key];
  });
  return obj;
}

export const formatNumberWithCommas = (number = 0) => {
  if (!number) return 0;
  number = `${number}`;
  const [integerPart, decimalPart] = number.split(".");

  // Add commas to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted number with decimals (if any)
  return decimalPart || number?.includes(".")
    ? `${formattedInteger}.${decimalPart || ""}`
    : formattedInteger;
};

export const removeCommas = (numberWithCommas = 0) => {
  if (!numberWithCommas && numberWithCommas !== 0) return numberWithCommas;
  return `${numberWithCommas}`?.replace(/,/g, "");
};