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
exports.createNeed = exports.findNeed = exports.findNeeds = void 0;
const Need_1 = __importDefault(require("../models/Need"));
const express_validator_1 = require("express-validator");
const findNeeds = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const needs = Need_1.default.find();
        res.json({
            isSuccess: true,
            data: needs,
            status: 1,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findNeeds = findNeeds;
const findNeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const need = Need_1.default.findById(req.params.id);
        res.json({
            isSuccess: true,
            data: need,
            status: 1,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findNeed = findNeed;
const createNeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const needDto = {
            body: req.body.body,
            header: req.body.header,
            tags: req.body.tags,
            user: req.userId,
        };
        const createNeed = new Need_1.default(needDto);
        const need = yield createNeed.save();
        res.status(201).json({
            isSuccess: true,
            message: 'Need created successfully',
            data: need,
            status: 1,
        });
    }
    catch (err) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.createNeed = createNeed;
//# sourceMappingURL=NeedController.js.map