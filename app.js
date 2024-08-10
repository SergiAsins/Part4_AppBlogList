import config from './utils/config.js'; 
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';

import morgan from 'morgan';
const app = express();
import cors from 'cors';
import logger from './utils/logger.js';
import blogRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/users.js';
import middleware from './utils/middleware.js';
import mongoose from 'mongoose';
import MONGODB_URI from './utils/config.js';

dotenv.config();
logger.info('connecting to, MONGODB_URI')

mongoose.connect('mongodb+srv://HasanAsins:HamdulilahElLoco666@clusterappphonebook.hcwfwel.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAppPhonebook')
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

morgan.token('body', (req) => JSON.stringify(req.body));


app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  } 

app.use(middleware.tokenExtractor)
app.use(middleware.tokenValidator)

app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)

export default app;