//==================================================
// GET = Obtener X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"

import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

import TardisModel from "../db/tardis.ts";  // Importo el modelo de la base de datos
import DimensionesModel from "../db/dimension.ts";
import PlanetasModel from "../db/planeta.ts";
import PersonasModel from "../db/persona.ts";

const get_inicio = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  
    try {
    const json_tardis = {
        title: "Tardis Data",
        data: (await TardisModel.find()
            .select("camuflaje numero_regeneracion ano id_dimensiones")
            .populate({
                path: "id_dimensiones",
                populate: { path: "id_planetas", populate: { path: "id_personas" } }
            })
            .exec()
        ).map((tardis) => {
            return {
                id: tardis._id.toString(),
                camuflaje: tardis.camuflaje,
                numero_regeneracion: tardis.numero_regeneracion,
                ano: tardis.ano,
                dimensiones: tardis.id_dimensiones.map(dimension => {
                    return {
                        id: dimension._id.toString(),
                        planetas: dimension.id_planetas.map(planeta => {
                            return {
                                id: planeta._id.toString(),
                                personas: planeta.id_personas.map(persona => {
                                    return {
                                        id: persona._id.toString(),
                                        nombre: persona.nombre,
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    };
    
    const json_dimensiones = {
        title: "Dimensiones Data",
        data: (await DimensionesModel.find()
            .select("_id id_planetas")
            .populate({ path: "id_planetas", populate: { path: "id_personas" } })
            .exec()
        ).map((dimension) => {
            return {
                id: dimension._id.toString(),
                planetas: dimension.id_planetas.map(planeta => {
                    return {
                        id: planeta._id.toString(),
                        personas: planeta.id_personas.map(persona => {
                            return {
                                id: persona._id.toString(),
                                nombre: persona.nombre,
                            }
                        })
                    }})
                }
        })
    };
    
    const json_planetas = {
        title: "Planetas Data",
        data: (await PlanetasModel.find()
            .select("_id id_personas")
            .populate({ path: "id_personas" })
            .exec()
        ).map((planeta) => {
            return {
                id: planeta._id.toString(),
                personas: planeta.id_personas.map(persona => {
                    return {
                        id: persona._id.toString(),
                        nombre: persona.nombre
                    }
                })
            }
        })
    };
    
    const json_personas = {
        title: "Personas Data",
        data: (await PersonasModel.find()
            .select("_id nombre")
            .exec()
        ).map((persona) => {
            return {
                id: persona._id.toString(),
                nombre: persona.nombre
            }
        })
    };        

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pr4-DoctorWho - Riego</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                text-align: center;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin: 20px auto;
                width: 80%;
            }
            pre {
                background-color: #f5f5f5;
                padding: 10px;
                border: 1px solid #ddd;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>API DOCTOR WHO - PRÁCTICA 4</h1>
            <p>Desarrollado por Alejandro Riego V.</p>
            <p>Consultar <a href="https://github.com/guengui25/practica-4-arquitectura-y-programacion-de-sistemas-en-internet" target="_blank">repositorio en GitHub</a></p>
            <h2>${json_tardis.title}</h2>
            <pre>${JSON.stringify(json_tardis.data, null, 2)}</pre>

            <h2>${json_dimensiones.title}</h2>
            <pre>${JSON.stringify(json_dimensiones.data, null, 2)}</pre>

            <h2>${json_planetas.title}</h2>
            <pre>${JSON.stringify(json_planetas.data, null, 2)}</pre>

            <h2>${json_personas.title}</h2>
            <pre>${JSON.stringify(json_personas.data, null, 2)}</pre>
        </div>
    </body>
    </html>
    `;

    res.status(200).send(html);

    } catch (error) {

        res.status(500).send(error.message); // Si hay un error, devuelvo un error 500

        return; // Corto la ejecucion de la funcion
    }
};

export default get_inicio; // Exporto la funcion