import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import usersRouter from "./users";
import projectsRouter from "./projects";
import tasksRouter from "./tasks";
import dashboardRouter from "./dashboard";
import activityRouter from "./activity";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/projects", projectsRouter);
router.use("/tasks", tasksRouter);
router.use("/dashboard", dashboardRouter);
router.use("/activity", activityRouter);

export default router;
