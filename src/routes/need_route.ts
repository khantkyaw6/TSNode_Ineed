import express from 'express';
import {
	createNeed,
	findNeed,
	findNeeds,
	removeNeed,
	updateNeed,
} from '../controllers/NeedController';
import { body } from 'express-validator';

const router = express.Router();

router
	.route('/')
	.get(findNeeds)
	.post(
		[
			body('header').notEmpty().withMessage('header must not be empty'),
			body('body').notEmpty().withMessage('body must not be empty'),
			body('tags').isArray().withMessage('tags must be array'),
		],
		createNeed
	);
router
	.route('/:id')
	.get(findNeed)
	.put(
		[
			body('header').notEmpty().withMessage('header must not be empty'),
			body('body').notEmpty().withMessage('body must not be empty'),
			body('tags').isArray().withMessage('tags must be array'),
			body('status').isBoolean().withMessage('status must be boolean'),
		],
		updateNeed
	)
	.delete(removeNeed);

export default router;
