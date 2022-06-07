import { Router, Request, Response } from "express";

import Load from "./load.cities";
import Find from "./find.cities";

const router : Router = Router();

router.use("/load", Load);
router.use("/find", Find);

export default router;