import "dotenv/config";
import "./config/db.js";
import app from "./app.js";

app.listen(3000, () => {
    console.log("App running");
});