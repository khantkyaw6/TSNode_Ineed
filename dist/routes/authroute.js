"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.put('/signup', [
    (0, express_validator_1.body)('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom((v) => {
        return User_1.default.findOne({ email: v }).then((user) => {
            if (user) {
                return Promise.reject('User with this email already existed!');
            }
            return Promise.resolve();
        });
    }),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password must not be empty!'),
], AuthController_1.signup);
exports.default = router;
//# sourceMappingURL=authroute.js.map