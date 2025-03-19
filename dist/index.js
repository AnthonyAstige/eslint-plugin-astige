"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const noTsxWithoutJsx_1 = __importDefault(require("./rules/noTsxWithoutJsx"));
exports.rules = {
    "no-tsx-without-jsx": noTsxWithoutJsx_1.default,
};
