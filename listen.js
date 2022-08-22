const app = require("./Main_app");

const { PORT = 9090 } = process.env;

app.listen(PORT);
console.log(`API server listening on port: ${process.env}`);
