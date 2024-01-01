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
exports.removeNeed = exports.updateNeed = exports.createNeed = exports.findNeed = exports.findNeeds = void 0;
const Need_1 = __importDefault(require("../models/Need"));
const express_validator_1 = require("express-validator");
const findNeeds = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const needs = yield Need_1.default.find();
        console.log(needs);
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
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const need = yield Need_1.default.findById(req.params.id);
        if (!need) {
            const error = new Error('Not Found');
            error.statusCode = 404;
            throw error;
        }
        res.json({
            isSuccess: true,
            data: need,
            status: 1,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.findNeed = findNeed;
const createNeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
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
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.createNeed = createNeed;
const updateNeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const need = yield Need_1.default.findById(req.params.id);
        if (!need) {
            const error = new Error('Not Found!');
            error.statusCode = 404;
            throw error;
        }
        // if (req.userId != need.user) {
        // 	const error: any = new Error('Unauthorized!');
        // 	error.statusCode = 401;
        // 	throw error;
        // }
        need.header = req.body.header;
        need.body = req.body.body;
        need.tags = req.body.tags;
        need.status = req.body.status ? 'Satisfied' : 'In progress';
        const result = yield need.save();
        res.json({ message: 'Updated Successfully!', data: result, status: 1 });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.updateNeed = updateNeed;
const removeNeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const need = yield Need_1.default.findById(req.params.id);
        if (!need) {
            const error = new Error('Not Found!');
            error.statusCode = 404;
            throw error;
        }
        yield Need_1.default.findByIdAndDelete(req.params.id);
        console.log('in here delete');
        res.status(200).json({
            isSuccess: true,
            message: 'Need deleted successfully',
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.removeNeed = removeNeed;
//# sourceMappingURL=NeedController.js.map