import { Request, Response, NextFunction } from 'express';
import Need from '../models/Need';
import { validationResult } from 'express-validator';
import { INeedCreate } from '../interfaces/iNeed';

export const findNeeds = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const needs = Need.find();
		res.json({
			isSuccess: true,
			data: needs,
			status: 1,
		});
	} catch (error) {
		next(error);
	}
};

export const findNeed = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const need = Need.findById(req.params.id);
		res.json({
			isSuccess: true,
			data: need,
			status: 1,
		});
	} catch (error) {
		next(error);
	}
};

export const createNeed = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const needDto: INeedCreate = {
			body: req.body.body,
			header: req.body.header,
			tags: req.body.tags,
			user: req.userId,
		};
		const createNeed = new Need(needDto);
		const need = await createNeed.save();

		res.status(201).json({
			isSuccess: true,
			message: 'Need created successfully',
			data: need,
			status: 1,
		});
	} catch (err: any) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error: any = new Error('Validation failed');
			error.data = errors.array();
			error.statusCode = 422;
			throw error;
		}

		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
