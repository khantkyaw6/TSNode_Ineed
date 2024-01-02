import express from 'express';
import {
	createNeed,
	findNeed,
	findNeeds,
	removeNeed,
	updateNeed,
} from '../controllers/NeedController';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
	.route('/')
	.get(authMiddleware, findNeeds)
	.post(
		authMiddleware,
		[
			body('header').notEmpty().withMessage('header must not be empty'),
			body('body').notEmpty().withMessage('body must not be empty'),
			body('tags').isArray().withMessage('tags must be array'),
		],
		createNeed
	);
router
	.route('/:id')
	.get(authMiddleware, findNeed)
	.put(
		authMiddleware,
		[
			body('header').notEmpty().withMessage('header must not be empty'),
			body('body').notEmpty().withMessage('body must not be empty'),
			body('tags').isArray().withMessage('tags must be array'),
			body('status').isBoolean().withMessage('status must be boolean'),
		],
		updateNeed
	)
	.delete(authMiddleware, removeNeed);

export default router;
