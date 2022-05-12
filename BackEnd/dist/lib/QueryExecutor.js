"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.execute = exports.Init = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
//var pool : oracledb.Pool | null = null;
const Init = () => {
    //pool =  oracledb.getPool("default")
};
exports.Init = Init;
const execute = (STATEMENT, data = {}, options = {}) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let connection = yield oracledb_1.default.getConnection({ password: "oracle", user: "system", connectString: "localhost/xe" });
        let result = yield (connection === null || connection === void 0 ? void 0 : connection.execute(STATEMENT, data, options));
        yield (connection === null || connection === void 0 ? void 0 : connection.release());
        return resolve(result);
    }
    catch (err) {
        console.log("RIP");
        return reject(err);
    }
}));
exports.execute = execute;
const testConnection = () => {
};
exports.testConnection = testConnection;
