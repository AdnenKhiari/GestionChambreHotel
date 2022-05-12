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
exports.RemoveOffer = exports.UpdateOffer = exports.AddOffer = exports.GetOffers = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const QueryExecutor_1 = require("../../lib/QueryExecutor");
const GetOffers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO XD
    return Promise.resolve([]);
});
exports.GetOffers = GetOffers;
const AddOffer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `INSERT INTO OFFERS VALUES (null,:description,TO_DATE(:date_start,'dd/mm/yyyy'),TO_DATE(:date_end,'dd/mm/yyyy'),:price)`;
    try {
        const binds = {
            description: { val: data.description, dir: oracledb_1.default.BIND_IN },
            date_start: { val: data.date_start, dir: oracledb_1.default.BIND_IN },
            price: { val: data.price, dir: oracledb_1.default.BIND_IN },
            date_end: { val: null }
        };
        if (data.date_end != undefined) {
            data["date_end"] = { date_end: { val: data.date_end, dir: oracledb_1.default.BIND_IN } };
        }
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT, binds, { autoCommit: true });
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.AddOffer = AddOffer;
const UpdateOffer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `UPDATE OFFERS SET 
    description=:description,
    date_start=TO_DATE(:date_start,'dd/mm/yyyy'),
    date_end=TO_DATE(:date_end,'dd/mm/yyyy'),
    price=:price
    WHERE id=:id
    `;
    try {
        const binds = {
            id: { val: data.id },
            description: { val: data.description, dir: oracledb_1.default.BIND_IN },
            date_start: { val: data.date_start, dir: oracledb_1.default.BIND_IN },
            price: { val: data.price, dir: oracledb_1.default.BIND_IN },
            date_end: { val: null }
        };
        if (data.date_end != undefined) {
            data["date_end"] = { date_end: { val: data.date_end, dir: oracledb_1.default.BIND_IN } };
        }
        const result = yield (0, QueryExecutor_1.execute)(STATEMENT, binds, { autoCommit: true });
        return Promise.resolve(result);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.UpdateOffer = UpdateOffer;
const RemoveOffer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const STATEMENT = `DELETE FORM OFFERS WHERE id=:id`;
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
exports.RemoveOffer = RemoveOffer;
