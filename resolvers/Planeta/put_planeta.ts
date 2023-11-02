//==================================================
// PUT = Actualizar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import PlanetaModel from "../../db/planeta.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import
const put_planeta = async (req: Request, res: Response) => {

  try {
    const { id } = req.params; // Obtengo el dni de los parametros de la peticion

    const { personas } = req.body; // Obtengo los datos del body de la peticion
        if (!personas) { // Si no estan todos los datos, devuelvo un error
        
            res.status(400).send("personas are required"); // Devuelvo un error

            return; // Corto la ejecucion de la funcion

    }

    const updatedPlaneta = await PlanetaModel.findByIdAndUpdate( // Actualizo la persona con el dni dado
      { id } , // Busco la persona con el dni dado

      { personas }, // Actualizo los datos de la persona con los datos del body de la peticion

      { new: true } // Con new: true, devuelvo la persona actualizada

    ).exec(); // Ejecuto la funcion

    if (!updatedPlaneta) { // Si no existe X con el dni dado, devuelvo un error

      res.status(404).send("Planeta not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    res.status(200).send({
      id: updatedPlaneta._id.toString(),
      personas: updatedPlaneta.personas 
      });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default put_planeta; // Exporto la funcion
