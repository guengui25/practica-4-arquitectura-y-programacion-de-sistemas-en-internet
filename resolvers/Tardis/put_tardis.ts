//==================================================
// PUT = Actualizar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

import mongoose from "npm:mongoose@7.6.3"; //Importo mongoose

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import TardisModel from "../../db/tardis.ts";  // Importo el modelo de la base de datos
import DimensionModel from "../../db/dimension.ts";  // Importo el modelo de la base de datos

                                                // PlantillaModelType es el tipo de dato que devuelve el import
const put_tardis = async (req: Request, res: Response) => {

  try {
    const { id } = req.params; // Obtengo el dni de los parametros de la peticion

    const { camuflaje, numero_regeneracion, ano , dimensiones } = req.body; // Obtengo los datos del body de la peticion
        if (!camuflaje || !numero_regeneracion || !ano || !dimensiones) { // Si no estan todos los datos, devuelvo un error
        
            res.status(400).send("camuflaje, numero de regeneracion, ano y dimensiones are required"); // Devuelvo un error

            return; // Corto la ejecucion de la funcion

    }

    const array_dimensiones = await Promise.all(dimensiones.map(async (id: string) => {
      // Compruebo que el id es valido
      if(mongoose.Types.ObjectId.isValid(id)){
          const aux = await DimensionModel.findById(id).exec(); // Busco el id de X en la base de datos
          // Compruebo que existe el planeta
          if (aux) {
              return {id: aux._id.toString()}; // Devuelvo el planeta

          } else { // Si no existe devuelvo un error
              res.status(400).send("dimensiones not found"); // Devuelvo un error
              return; // Corto la ejecucion de la funcion
          }
      }
      else{
          res.status(400).send("dimensiones id not valid type"); // Devuelvo un error
          return; // Corto la ejecucion de la funcion
      }
  }));

    const updatedTardis = await TardisModel.findByIdAndUpdate( // Actualizo la persona con el dni dado
      id , // Busco la persona con el dni dado

      { camuflaje, numero_regeneracion, ano, dimensiones }, // Actualizo los datos de la persona con los datos del body de la peticion

      { new: true } // Con new: true, devuelvo la persona actualizada

    ).exec(); // Ejecuto la funcion

    if (!updatedTardis) { // Si no existe X con el dni dado, devuelvo un error

      res.status(404).send("Tardis not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    res.status(200).send({
      id: updatedTardis._id.toString(),
      camuflaje: updatedTardis.camuflaje,
      numero_regeneracion: updatedTardis.numero_regeneracion,
      ano: updatedTardis.ano,
      id_dimensiones: updatedTardis.id_dimensiones,
      });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default put_tardis; // Exporto la funcion