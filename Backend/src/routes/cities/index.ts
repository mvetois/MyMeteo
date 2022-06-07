import { Router, Request, Response } from "express";

import Load from "./load.cities";
import Find from "./find.cities";
import Weather from "./weather.cities";

const router : Router = Router();

router.use("/load", Load);
router.use("/find", Find);
router.use("/weather", Weather);

export default router;