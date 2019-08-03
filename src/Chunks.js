export const chunks = (items, chunkSize) => {
  let chunkedArray = [];
  for (let i = 0, len = items.length; i < len; i += chunkSize)
    chunkedArray.push(items.slice(i, i + chunkSize));
  return chunkedArray;
};
