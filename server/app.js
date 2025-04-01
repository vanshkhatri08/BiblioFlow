import express from "express";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import { errorMiddleware } from "./middlewares/errormiddlewares.js";
// import authRouter from "./routes/authRouter.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import expressFileupload from "express-fileupload"
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

export const app = express();

config();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST","PUT", "DELETE"],
    credentials: true,
})
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(expressFileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);
// http://localhost:4000/api/v1/auth/register

notifyUsers();
removeUnverifiedAccounts();
connectDB();

app.use(errorMiddleware);