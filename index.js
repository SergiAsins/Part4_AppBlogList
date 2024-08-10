import app from './app.js';
import http from 'http';
import mongoose from 'mongoose';
import express from 'express';
import blogRouter from './controllers/blogs.js';
import config from './utils/config.js'; 
import logger from './utils/logger.js'; 

//const app = express();
const server = http.createServer(app)

//per a borrar:
const url = process.env.MONGODB_URI || 'mongodb+srv://HasanAsins:HamdulilahElLoco666@clusterappphonebook.hcwfwel.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAppPhonebook';

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })




