module.exports = function(urlString,obj) {
  return new Promise(
      function(resolve, reject) {
          fetch(urlString,obj)
            .then((response) => response.json())
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
      }
  );
};