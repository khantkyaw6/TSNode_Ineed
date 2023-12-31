import express from 'express';
import { createNeed, findNeeds } from '../controllers/NeedController';
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

export default router;
