"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Client_1 = __importDefault(require("./Client"));
const Rooms_1 = __importDefault(require("./Rooms"));
const Bookings_1 = __importDefault(require("./Bookings"));
const Offers_1 = __importDefault(require("./Offers"));
const app = express_1.default.Router();
app.use("/clients", Client_1.default);
app.use("/bookings", Bookings_1.default);
app.use("/offers", Offers_1.default);
app.use("/rooms", Rooms_1.default);
exports.default = app;
