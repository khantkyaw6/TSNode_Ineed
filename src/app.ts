import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.DATABASE || '').then(() => {
	app.listen(PORT, () => {
		console.log('Server is running at Port ', PORT);
	});
});
