const { glob } = require('glob');

const findFiles = async (pattern) => {
  const files = await glob(pattern, {
    dot: true,
    followSymbolicLinks: false
  });
  return files;
};

module.exports = {
  findFiles
};
