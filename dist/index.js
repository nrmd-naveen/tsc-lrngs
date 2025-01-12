"use strict";
// First Postgress App
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = "postgresql://test_owner:2Obki0PejtNh@ep-bold-recipe-a5t4z5al.us-east-2.aws.neon.tech/test?sslmode=require";
const pgClient2 = new pg_1.Client({
    user: "test_owner",
    password: "2Obki0PejtNh",
    host: "ep-bold-recipe-a5t4z5al.us-east-2.aws.neon.tech",
    port: 5432,
    database: "test"
});
const pgClient = new pg_1.Client(connectionString);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pgClient.connect();
    const res = yield pgClient.query("SELECT * FROM users;");
    console.log(res);
});
main();
