import { Request, Response, NextFunction } from 'express';
import Need from '../models/Need';
import { validationResult } from 'express-validator';
import { INeedCreate } from '../interfaces/INeed';

export const findNeeds = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const needs = await Need.find();
		console.log(needs);
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
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error: any = new Error('Validation failed!');
			error.data = errors.array();
			error.statusCode = 422;
			throw error;
		}

		const need = await Need.findById(req.params.id);

		if (!need) {
			const error: any = new Error('Not Found');
			error.statusCode = 404;
			throw error;
		}
		res.json({
			isSuccess: true,
			data: need,
			status: 1,
		});
	} catch (err: any) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const createNeed = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const error: any = new Error('Validation failed!');
			error.data = errors.array();
			error.statusCode = 422;
			throw error;
		}

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
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const updateNeed = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const need: any = await Need.findById(req.params.id);
		if (!need) {
			const error: any = new Error('Not Found!');
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
		const result = await need.save();

		res.json({ message: 'Updated Successfully!', data: result, status: 1 });
	} catch (err: any) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const removeNeed = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error: any = new Error('Validation failed!');
			error.data = errors.array();
			error.statusCode = 422;
			throw error;
		}
		const need: any = await Need.findById(req.params.id);
		if (!need) {
			const error: any = new Error('Not Found!');
			error.statusCode = 404;
			throw error;
		}

		await Need.findByIdAndDelete(req.params.id);
		console.log('in here delete');
		res.status(200).json({
			isSuccess: true,
			message: 'Need deleted successfully',
		});
	} catch (err: any) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
