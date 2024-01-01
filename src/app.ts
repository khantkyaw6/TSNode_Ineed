import express, { Request } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import errorMiddleware from './middlewares/errorMiddleware';
import { rootDir } from './utils/utils';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const fileStorage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'images');
	},
	filename: (_req, file, cb) => {
		cb(null, `${v4()}_${file.originalname}`);
	},
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter }).single('profileImage'));
app.use('/images', express.static(path.join(rootDir, 'images')));

mongoose.connect(process.env.DATABASE || '').then(() => {
	console.log('Connected to the database');
	app.listen(PORT, () => {
		console.log('Server is running at Port ', PORT);
	});

	app.use(router);
	app.use(errorMiddleware);
});
