import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserCreate } from '../interfaces/IUser';

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('isError');
			const error: any = new Error('Validation failed!');
			error.data = errors.array();
			error.statusCode = 422;
			throw error;
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 12);
		const userDto: IUserCreate = {
			email: req.body.email,
			password: hashedPassword,
		};

		const user = new User(userDto);
		await user.save();
		console.log(user);

		const token = jwt.sign(
			{ userId: user._id },
			process.env.SECRET || 'secret',
			{
				expiresIn: '1d',
			}
		);

		console.log(token);

		res.json({
			message: 'User created successfully',
			token,
			data: user,
			status: 1,
		});
	} catch (error: any) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};
