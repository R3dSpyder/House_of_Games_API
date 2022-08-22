const { app } = require("./main_app");

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`API server listening on port: ${PORT}`);
});
