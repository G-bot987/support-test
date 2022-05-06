// Note: do not modify/fix this function, it's intended to act as an unreliable service
const getIsTrending = async (length) => {
  return new Promise((resolve, reject) => {
    if (Date.now() % 2 === 0) {
      return reject();
    }
    resolve(new Array(length).fill(0).map((i) => Math.random() < 0.5 ? true : false));
  });
}

exports.getIsTrending = getIsTrending;
