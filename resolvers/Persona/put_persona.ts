//==================================================
// PUT = Actualizar X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

//Importo los modelos de la base de datos

// import xxx from "./db/xxx.ts";

import PersonaModel from "../../db/persona.ts";  // Importo el modelo de la base de datos
                                                // PlantillaModelType es el tipo de dato que devuelve el import
const put_persona = async (req: Request, res: Response) => {

  try {
    const { id } = req.params; // Obtengo el dni de los parametros de la peticion

    const { nombre } = req.body; // Obtengo los datos del body de la peticion
        if (!nombre) { // Si no estan todos los datos, devuelvo un error
        
            res.status(400).send("nombre is required"); // Devuelvo un error

            return; // Corto la ejecucion de la funcion

    }

    const updatedPersona = await PersonaModel.findByIdAndUpdate( // Actualizo la persona con el dni dado
      id , // Busco la persona con el dni dado

      { nombre }, // Actualizo los datos de la persona con los datos del body de la peticion

      { new: true } // Con new: true, devuelvo la persona actualizada

    ).exec(); // Ejecuto la funcion

    if (!updatedPersona) { // Si no existe X con el dni dado, devuelvo un error

      res.status(404).send("Persona not found"); // Devuelvo un error

      return; // Corto la ejecucion de la funcion
    }

    res.status(200).send({
      id: updatedPersona._id.toString(),
      nombre: updatedPersona.nombre 
      });

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default put_persona; // Exporto la funcion
