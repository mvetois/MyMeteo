import { Router, Request, Response } from "express";

import axios, {AxiosResponse} from "axios";

import { Cities } from "../../utils/models/cities.model";

const router : Router = Router();


interface DataCity {
    nom: string;
    code: string;
    codesPostaux: string[];
    departement: {code: string, nom: string};
    centre: {type: string, coordinates: [number]}
};

const getCities = async (): Promise<DataCity[]> => {
    const result: AxiosResponse<DataCity[], any> = await axios.get("https://geo.api.gouv.fra/communes?fields=nom,code,codesPostaux,centre,departement").catch((err) => err);
    return (result.data);
};

/**
 * @swagger
 * /cities/load:
 *   post:
 *     summary: Load all cities with usefull data.
 *     description: Call the gouv.fr API and load all datas from cities in france.
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: Sucess !
 *         content:
 *           application/json:
 *             message:
 *               type: string
 *               description: Sucess message.
 *       500:
 *         description: Internal server error !
 *         content:
 *           application/json:
 *             message:
 *               type: string
 *               description: Error message.
 */
router.post("/", async (req : Request, res : Response) => {

    const CitiesData : DataCity[] = await getCities()

    if (!CitiesData)
        return (res.status(500).json({message: "Error while loading cities"}));
    await Cities.deleteMany({}).catch((err) => err);

    for (const city of CitiesData) {
        const user : any = new Cities({
            name: city.nom,
            code: city?.code || "-1",
            codePst: city?.codesPostaux || ["-1"],
            codeDpt: city?.departement?.code || "-1",
            nameDpt: city?.departement?.nom || "-1",
            coord: city?.centre?.coordinates || [-1]
        });
        await user.save();
    }
    return (res.status(200).send({message: "Cities well actualised"}));
});

export default router;