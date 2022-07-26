import dotenv from 'dotenv';

dotenv.config();

global.__LOCAL__ = process.env.NODE_ENV === 'local';
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';
