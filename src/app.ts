import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE || '').then(() => {
	console.log('Connected to the database');
	app.listen(PORT, () => {
		console.log('Server is running at Port ', PORT);
	});

	app.use(router);
	app.use(errorMiddleware);
});
