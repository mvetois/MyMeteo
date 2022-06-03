import { Router, Request, Response } from "express";

import Load from "./load.cities";

const router : Router = Router();

router.use("/load", Load);

export default router;