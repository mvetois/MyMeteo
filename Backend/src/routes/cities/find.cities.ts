import { Router, Request, Response } from "express";

import { Cities, ICities } from "../../utils/models/cities.model";

const router : Router = Router();

/**
 * @swagger
 * /cities/find:
 *   get:
 *     summary: Get the cities from the db.
 *     description: Check the cities and return the correct one.
 *     tags: [Cities]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: param
 *         description: The name or postal code of the city.
 *         required: true
 *     responses:
 *       200:
 *         description: Sucess !
 *         content:
 *           application/json:
 *             message:
 *               type: string
 *               description: Sucess message.
 *       400:
 *         description: Bad request !
 *         content:
 *           application/json:
 *             message:
 *               type: string
 *               description: Error message.
 */
router.get("/", async (req : Request, res : Response) => {

    if (!req.query || !req.query.param)
        return (res.status(400).json({message: "Missing param parameter"}));
    var citiesList : ICities[] = undefined;
    if (!isNaN(Number(req.query.param)))
        citiesList = await Cities.find({codePst: req.query.param}, {"_id": false, "__v": false}).catch((err) => err);
    else
        citiesList = await Cities.find({name: req.query.param}, {"_id": false, "__v": false}).catch((err) => err);
    if (!citiesList || citiesList.length === 0)
        return (res.status(400).json({message: "City not found"}));
    return (res.status(200).send(citiesList));
});

export default router;