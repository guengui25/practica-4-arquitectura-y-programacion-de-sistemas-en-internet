//==================================================
// DELETE = Borrar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import PlanetaModel from "../../db/planeta.ts";  // Importo el modelo de la base de datos
import PersonaModel from "../../db/persona.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import

const delete_planeta = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  try {

    const { id } = req.params; // Obtengo el dni de los parametros de la peticion

    const planeta = await PlanetaModel.findByIdAndDelete(id).exec(); // Busco el dni de X en la base de datos

    if (!planeta) { // Si no existe X con ese dni, devuelvo un error

      res.status(404).send("planeta not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    // Obtengo los IDs de las personas relacionadas con el planeta
    if(planeta.id_personas !== null){
      const personasIds = planeta.id_personas;

      // Borro las personas relacionadas con el planeta
      await personasIds.forEach(async (personaId) => {
        await PersonaModel.findByIdAndDelete(personaId).exec();
      });
   }

    res.status(200).send("planeta and the personas asociated with planeta ",{id},"deleted"); // Si se ha borrado correctamente, devuelvo un mensaje de que se ha borrado correctamente

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default delete_planeta; // Exporto la funcion
