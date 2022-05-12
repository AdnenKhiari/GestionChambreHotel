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
exports.RemoveRoom = exports.UpdateRoom = exports.AddRoom = exports.GetRooms = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const QueryExecutor_1 = require("../../lib/QueryExecutor");
const GetRooms = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO XD
    return Promise.resolve([]);
});
exports.GetRooms = GetRooms;
const AddRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `INSERT INTO ROOMS VALUES (null,:room_number,:capacity,:type,:options,:state)`;
    try {
        const binds = {
            room_number: { val: data.room_number, dir: oracledb_1.default.BIND_IN },
            capacity: { val: data.capacity, dir: oracledb_1.default.BIND_IN },
            type: { val: data.type, dir: oracledb_1.default.BIND_IN },
            options: { val: data.options, dir: oracledb_1.default.BIND_IN },
            state: { val: data.state, dir: oracledb_1.default.BIND_IN }
        };
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT, binds, { autoCommit: true });
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.AddRoom = AddRoom;
const UpdateRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `UPDATE OFFERS SET 
    room_number=:room_number,
    capacity=:capacity,
    type=:type,
    options=:options,   
    state=:state

    WHERE id=:id
    `;
    try {
        const binds = {
            id: { val: data.id },
            room_number: { val: data.room_number, dir: oracledb_1.default.BIND_IN },
            capacity: { val: data.capacity, dir: oracledb_1.default.BIND_IN },
            type: { val: data.type, dir: oracledb_1.default.BIND_IN },
            options: { val: data.options, dir: oracledb_1.default.BIND_IN },
            state: { val: data.state, dir: oracledb_1.default.BIND_IN }
        };
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT, binds, { autoCommit: true });
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.UpdateRoom = UpdateRoom;
const RemoveRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `DELETE FORM ROOMS WHERE id=:id`;
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
exports.RemoveRoom = RemoveRoom;
