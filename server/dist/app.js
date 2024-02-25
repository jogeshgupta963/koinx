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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const coin_1 = require("./routes/coin");
const error_handler_1 = require("./middlewares/error-handler");
exports.app = (0, express_1.default)();
//configs
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use((0, cors_1.default)());
//routes
exports.app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: "running...",
    });
});
exports.app.use("/coin", coin_1.router);
exports.app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("Not Found");
}));
exports.app.use(error_handler_1.errorHandler);
