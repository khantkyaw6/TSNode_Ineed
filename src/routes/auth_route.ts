import express from 'express';
import { signup } from '../controllers/AuthController';
import { body } from 'express-validator';
import User from '../models/User';

const router = express.Router();

router.put(
	'/signup',
	[
		body('email')
			.trim()
			.isEmail()
			.normalizeEmail()
			.notEmpty()
			.withMessage('Email must not be empty')
			.custom((v) => {
				return User.findOne({ email: v }).then((user) => {
					if (user) {
						return Promise.reject(
							'User with this email already existed!'
						);
					}
					return Promise.resolve();
				});
			}),
		body('password').notEmpty().withMessage('Password must not be empty!'),
	],
	signup
);

export default router;
