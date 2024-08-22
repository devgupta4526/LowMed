import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(cookieParser());
app.use(json({ limit: "10mb" }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes import
import userRouter from './routes/user.routes.js';
import blogRouter from './routes/blog.routes.js';
import commentRouter from './routes/comment.routes.js'

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comments",commentRouter);

export { app };
