import express from 'express';
import { signup, login, editProfile } from '../controllers/AuthController';
import { body } from 'express-validator';
import User from '../models/User';
import authMiddleware from '../middlewares/authMiddleware';

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

router.post(
	'/login',
	[
		body('email')
			.trim()
			.isEmail()
			.normalizeEmail()
			.withMessage('Invalid email!'),
		body('password').notEmpty().withMessage('Password must not be empty!'),
	],
	login
);

router.put(
	'/edit-profile',
	authMiddleware,
	[body('username').notEmpty().withMessage('Username must not be empty!')],
	editProfile
);

export default router;
