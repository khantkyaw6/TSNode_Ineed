"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const need_route_1 = __importDefault(require("./need_route"));
const auth_route_1 = __importDefault(require("./auth_route"));
const router = express_1.default.Router();
router.use('/api/auth', auth_route_1.default);
router.use('/api/needs', need_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map