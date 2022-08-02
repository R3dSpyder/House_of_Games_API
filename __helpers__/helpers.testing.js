//to use in JEST testing files to close the test server after each test.
const destroy = (server) => {
  server.close();
};

module.exports = destroy;
