import express from 'express';
import bodyParser from 'body-parser'; // bodyParser allows to post requests
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
const CONNECTION_URL =
  'mongodb+srv://adi1234:Adi2810D@cluster0.nzyw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server runs on port ${PORT}`))
  )
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);
