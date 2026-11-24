import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.get("/health", (_req: Request, res: Response) =>
  res.json({ status: "ok" }),
);
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);
