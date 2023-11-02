//==================================================
// POST = Nuevo X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import TardisModel from "../../db/tardis.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import

const post_tardis = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
    try {
        const { camuflaje, numero_regeneracion, ano , dimensiones } = req.body; // Obtengo los datos del body de la peticion
        if (!camuflaje || !numero_regeneracion || !ano || !dimensiones) { // Si no estan todos los datos, devuelvo un error
        
            res.status(400).send("camuflaje, numero de regeneracion, ano y dimensiones are required"); // Devuelvo un error

            return; // Corto la ejecucion de la funcion

        }
    
        const newTardis = new TardisModel({ camuflaje, numero_regeneracion, ano, dimensiones }); // Creo un nuevo X con los datos del body de la peticion
        
        //https://mongoosejs.com/docs/documents.html -> Utilizo documentos de Mongo para guardar el nuevo X en la base de datos

        await newTardis.save(); // Guardo el nuevo X en la base de datos
    
        res.status(200).send({
        camuflaje: newTardis.camuflaje,
        numero_regeneracion: newTardis.numero_regeneracion,
        ano: newTardis.ano,
        dimensiones: newTardis.dimensiones,
        id: newTardis._id.toString(),
        });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};
    
export default post_tardis; // Exporto la funcion
