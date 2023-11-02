//==================================================
// GET = Obtener X
//==================================================

//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"

import { Request, Response } from "npm:express@4.18.2"; // importo los tipos de express Request y Response

const get_inicio = async (req: Request, res: Response) => { // async es para que la funcion sea asincrona
  
    try {

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Página de Inicio</title>
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
        </style>
    </head>
    <body>
        <div class="container">
            <h1>API DOCTOR WHO - PRÁCTICA 4</h1>
            <p>Desarrollado por Alejandro Riego V.</p>
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