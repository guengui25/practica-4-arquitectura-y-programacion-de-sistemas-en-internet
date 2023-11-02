//==================================================
// DELETE = Borrar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import TardisModel from "../../db/tardis.ts";  // Importo el modelo de la base de datos
import DimensionModel from "../../db/dimension.ts";  // Importo el modelo de la base de datos
import PlanetaModel from "../../db/planeta.ts";  // Importo el modelo de la base de datos
import PersonaModel from "../../db/persona.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import

const delete_tardis = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  try {

    const { id } = req.params; // Obtengo el dni de los parametros de la peticion

    const tardis = await TardisModel.findByIdAndDelete(id).exec(); // Busco el dni de X en la base de datos

    if (!tardis) { // Si no existe X con ese dni, devuelvo un error

      res.status(404).send("tardis not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    if(tardis.id_dimensiones !== null){
    // Obtengo los IDs de las dimensiones relacionadas con la tardis
    const dimensionesIds = tardis.id_dimensiones;
    
    // Espero a que todo se borre antes de continuar
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

      await Promise.all(dimensionesIds.map(async (dimensionId) => {
        const dimension = await DimensionModel.findByIdAndDelete(dimensionId).exec();
        
        if(dimension.id_planetas !== null){
        const planetasIds = dimension.id_planetas;
          await Promise.all(planetasIds.map(async (planetaId) => {
            // Obten los IDs de las personas relacionadas con el planeta
            const planeta = await PlanetaModel.findByIdAndDelete(planetaId).exec();
            if(planeta.id_personas !== null){
              const personasIds = planeta.id_personas;
              // Itera a través de los IDs de las personas y elimina cada una
              await Promise.all(personasIds.map(async (personaId) => {
                await PersonaModel.findByIdAndDelete(personaId).exec();
              }));
            }
          }));
        }
      }));
    
    }

    // Obtengo los IDs de los planetas relacionados con la dimension



    res.status(200).send("tardis,dimensiones, planetas and the personas asociated with the tardis "+id+"deleted"); // Si se ha borrado correctamente, devuelvo un mensaje de que se ha borrado correctamente

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default delete_tardis; // Exporto la funcion
