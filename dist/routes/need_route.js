"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NeedController_1 = require("../controllers/NeedController");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router
    .route('/')
    .get(authMiddleware_1.default, NeedController_1.findNeeds)
    .post(authMiddleware_1.default, [
    (0, express_validator_1.body)('header').notEmpty().withMessage('header must not be empty'),
    (0, express_validator_1.body)('body').notEmpty().withMessage('body must not be empty'),
    (0, express_validator_1.body)('tags').isArray().withMessage('tags must be array'),
], NeedController_1.createNeed);
router
    .route('/:id')
    .get(authMiddleware_1.default, NeedController_1.findNeed)
    .put(authMiddleware_1.default, [
    (0, express_validator_1.body)('header').notEmpty().withMessage('header must not be empty'),
    (0, express_validator_1.body)('body').notEmpty().withMessage('body must not be empty'),
    (0, express_validator_1.body)('tags').isArray().withMessage('tags must be array'),
    (0, express_validator_1.body)('status').isBoolean().withMessage('status must be boolean'),
], NeedController_1.updateNeed)
    .delete(authMiddleware_1.default, NeedController_1.removeNeed);
exports.default = router;
//# sourceMappingURL=need_route.js.map