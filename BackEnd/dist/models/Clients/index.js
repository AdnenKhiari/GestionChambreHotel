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
exports.RemoveClient = exports.UpdateClient = exports.AddClient = exports.GetClientHistory = exports.GetClientInfo = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const QueryExecutor_1 = require("../../lib/QueryExecutor");
const GetClientInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const STATEMENT = `SELECT id,fullname,cin,gender FROM CLIENTS`;
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT);
        return Promise.resolve(result.rows);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.GetClientInfo = GetClientInfo;
const GetClientHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO XD
    return Promise.resolve([]);
});
exports.GetClientHistory = GetClientHistory;
const AddClient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `INSERT INTO CLIENTS VALUES (null,:fullname,:address,TO_DATE(:date_of_birth,'dd/mm/yyyy'),:cin,:job,:gender,:state)        `;
    try {
        const binds = {
            fullname: { val: data.fullname, dir: oracledb_1.default.BIND_IN },
            address: { val: data.address, dir: oracledb_1.default.BIND_IN },
            date_of_birth: { val: data.date_of_birth, dir: oracledb_1.default.BIND_IN },
            cin: { val: data.cin, dir: oracledb_1.default.BIND_IN },
            gender: { val: data.gender, dir: oracledb_1.default.BIND_IN },
            state: { val: data.state, dir: oracledb_1.default.BIND_IN },
            job: { val: null }
        };
        if (data.job != undefined) {
            binds["job"] = { val: data.job, dir: oracledb_1.default.BIND_IN };
        }
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT, binds, { autoCommit: true });
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.AddClient = AddClient;
const UpdateClient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `UPDATE CLIENTS SET fullname=:fullname,
    address=:address,
    date_of_birth=TO_DATE(:date_of_birth,'dd/mm/yyyy'),
    cin=:cin,
    job=:job,
    gender=:gender,
    state=:state
    WHERE id=:id
    `;
    try {
        const binds = {
            id: { val: data.id },
            fullname: { val: data.fullname, dir: oracledb_1.default.BIND_IN },
            address: { val: data.address, dir: oracledb_1.default.BIND_IN },
            date_of_birth: { val: data.date_of_birth, dir: oracledb_1.default.BIND_IN },
            cin: { val: data.cin, dir: oracledb_1.default.BIND_IN },
            gender: { val: data.gender, dir: oracledb_1.default.BIND_IN },
            state: { val: data.state, dir: oracledb_1.default.BIND_IN },
            job: { val: null }
        };
        if (data.job != undefined) {
            binds["job"] = { val: data.job, dir: oracledb_1.default.BIND_IN };
        }
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT, binds, { autoCommit: true });
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.UpdateClient = UpdateClient;
const RemoveClient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `DELETE FROM CLIENTS WHERE id=:id`;
    try {
        const binds = {
            id: { val: data.id, dir: oracledb_1.default.BIND_IN },
        };
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT, binds, { autoCommit: true });
        return Promise.resolve(result.rowsAffected === 1);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.RemoveClient = RemoveClient;
