export const firstLetterToUpperCase = (str) => str[0].toUpperCase() + str.substr(1);
export const firstLetterToLowerCase = (str) => str[0].toLowerCase() + str.substr(1);

export const propertyKeyToLabel = (key) => {
  if (key && key.length > 0) {
    return firstLetterToUpperCase(key)
      .split("")
      .reduce((acc, cur) => acc + (cur.charCodeAt(0) >= 65 && cur.charCodeAt(0) <= 90 ? ` ${cur}` : cur), "");
  }
  return "";
};
