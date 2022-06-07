import { Router, Request, Response } from "express";

import axios, {AxiosResponse} from "axios";

import { Cities, ICities } from "../../utils/models/cities.model";

const router : Router = Router();

const getWeather = async (lat: string, lon: string): Promise<any> => {
    const result: AxiosResponse<any, any> = await axios.get("https://api.open-meteo.com/v1/forecast?current_weather=true&longitude=" + lon + "&latitude=" + lat).catch((err) => err);
    return (result.data);
};

/**
 * @swagger
 * /cities/weather:
 *   get:
 *     summary: Get the weather from a city.
 *     description: Get the city weather.
 *     tags: [Cities]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: code
 *         description: The unique code of the city.
 *         required: true
 *     responses:
 *       200:
 *         description: Sucess !
 *         content:
 *           application/json:
 *             data:
 *               type: array
 *               description: Weather data.
 *             city:
 *               type: array
 *               description: City data.
 *       400:
 *         description: Bad request !
 *         content:
 *           application/json:
 *             message:
 *               type: string
 *               description: Error message.
 *       500:
 *         description: Internal server error !
 *         content:
 *           application/json:
 *             message:
 *               type: string
 *               description: Error message.
 */
router.get("/", async (req : Request, res : Response) => {

    if (!req.query || !req.query.code)
        return (res.status(400).json({message: "Missing param parameter"}));
    var citiesList : ICities[] =  await Cities.find({code: req.query.code}, {"_id": false, "__v": false}).catch((err) => err);
    if (!citiesList || citiesList.length === 0)
        return (res.status(400).json({message: "City not found"}));
    const result : any = await getWeather(String(citiesList[0].coord[0]), String(citiesList[0].coord[1]));
    return (res.status(200).json({data: result, city: citiesList[0]}));
});

export default router;