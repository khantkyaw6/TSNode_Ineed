import express from 'express';
import need_route from './need_route';

const router = express.Router();

router.use('/api/needs', need_route);

export default router;
