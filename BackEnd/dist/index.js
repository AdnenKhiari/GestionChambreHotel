"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const QueryExecutor_1 = require("./lib/QueryExecutor");
const controllers_1 = __importDefault(require("./controllers"));
//start an app instance
const app = (0, express_1.default)();
require("dotenv").config();
//ready to accept json data
app.use(body_parser_1.default.json());
//open pool connections to db
(0, QueryExecutor_1.Init)();
//Test db connection 
(0, QueryExecutor_1.testConnection)();
app.get("/", (req, res) => {
    res.send("Hii");
});
app.use("/api", controllers_1.default);
app.listen(process.env.SERVER_PORT, () => {
    console.log("Working fine !");
});
