import { Request, Response, NextFunction } from 'express';

export default (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	const { message, data } = err;
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		isSuccess: false,
		message,
		data,
		status: 0,
	});
};
