import express from 'express';
import bodyParser from 'body-parser'; // bodyParser allows to post requests
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import postRoutes from './routes/postsRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server runs on port ${PORT}`))
  )
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);
