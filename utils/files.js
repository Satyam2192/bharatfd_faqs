const { glob } = require('glob');

const findFiles = async (pattern) => {
  // Updated glob syntax for v10
  const files = await glob(pattern, {
    dot: true,
    followSymbolicLinks: false
  });
  return files;
};

module.exports = {
  findFiles
};
