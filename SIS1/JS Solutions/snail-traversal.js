Array.prototype.snail = function(rowsCount, colsCount) {
  if (rowsCount * colsCount !== this.length) return [];

  const result = [];
  for (let i = 0; i < rowsCount; i++) {
    result.push([]);
  }

  for (let i = 0; i < this.length; i++) {
    const col = Math.floor(i / rowsCount);
    const pos = i % rowsCount;
    const row = col % 2 === 0 ? pos : rowsCount - 1 - pos;
    result[row][col] = this[i];
  }
  return result;
};
