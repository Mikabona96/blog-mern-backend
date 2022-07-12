import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

// bring routes
import  blogRoutes from './routes/blog.js';
import  authRoutes from './routes/auth.js';

// app
const app = express();

// db
mongoose.connect(`${process.env.DATABASE_LOCAL}`)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err))

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// routes middleware
app.use(blogRoutes)
app.use(authRoutes)

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

// port 
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})

 











