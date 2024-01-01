import express from 'express';
import need_route from './need_route';
import auth_route from './auth_route';

const router = express.Router();

router.use('/api/needs', need_route);
router.use('/api/auth', auth_route);

export default router;
