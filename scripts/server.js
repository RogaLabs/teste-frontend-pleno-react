const path = require("path");
const json = require("json-server");
const extract = require("./extract");

const app = json.create();
const db = path.join(__dirname, "../mocks/db.json");

app.use(extract);
app.use(json.bodyParser);
app.use(json.defaults());
app.use("/api", json.router(db));

app.listen(8080, () => console.log("Server running on port 8080..."));
