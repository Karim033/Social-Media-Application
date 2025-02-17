import authRouter from "./Modules/Auth/auth.controller.js";
import userRouter from "./Modules/User/user.controller.js";
import postRouter from "./Modules/Post/post.controller.js";
import commentRouter from "./Modules/Comment/comment.controller.js";
import adminRouter from "./Modules/Admin/admin.controller.js";
import morgan from "morgan";
import connectDB from "./DB/connection.js";
import {
  globalErrorHandler,
  notFoundHabdler,
} from "./utils/error handling/asyncHandler.js";

const bootstarp = async (app, express) => {
  await connectDB();

  app.use(morgan("dev")); // dev mode onlys
  app.use(express.json());

  // const whiteList = ["http://localhost:4200", "http://localhost:8080"];

  // app.use((req, res, next) => {
  //   // req.headers
  //   if (!whiteList.includes(req.header("origin"))) {
  //     return next(new Error("Blocked By CORS"));
  //   }
  //   res.header("Access-Control-Allow-Origin", req.header("origin"));
  //   res.header("Access-Control-Allow-Headers", "*");
  //   res.header("Access-Control-Allow-Methods", "*");
  //   res.header("Access-Control-Private-Network", true);

  //   return next();
  // });

  app.get("/", (req, res) => res.json("Hello World!"));

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);
  app.use("/admin", adminRouter);

  app.all("*", notFoundHabdler);

  app.use(globalErrorHandler);
};

export default bootstarp;
