//to close the server after each test.
const destroy = (server) => {
  server.close();
};

module.exports = destroy;
