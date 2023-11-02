//==================================================
// POST = Nuevo X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import PlanetaModel from "../../db/planeta.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import

const post_planeta = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
    try {
        const {personas} = req.body; // Obtengo los datos del body de la peticion
        if (!personas) { // Si no estan todos los datos, devuelvo un error
        
            res.status(400).send("personas are required"); // Devuelvo un error

            return; // Corto la ejecucion de la funcion

        }
    
        const newPlaneta = new PlanetaModel({ personas }); // Creo un nuevo X con los datos del body de la peticion
        
        //https://mongoosejs.com/docs/documents.html -> Utilizo documentos de Mongo para guardar el nuevo X en la base de datos

        await newPlaneta.save(); // Guardo el nuevo X en la base de datos
    
        res.status(200).send({
            id: newPlaneta._id.toString(),
            personas: newPlaneta.personas 
        });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};
    
export default post_planeta; // Exporto la funcion
