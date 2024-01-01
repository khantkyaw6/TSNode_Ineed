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
exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log('isError');
            const error = new Error('Validation failed!');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 12);
        const userDto = {
            email: req.body.email,
            password: hashedPassword,
        };
        const user = new User_1.default(userDto);
        yield user.save();
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET || 'secret', {
            expiresIn: '1d',
        });
        console.log(token);
        res.json({
            message: 'User created successfully',
            token,
            data: user,
            status: 1,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.signup = signup;
//# sourceMappingURL=AuthController.js.map