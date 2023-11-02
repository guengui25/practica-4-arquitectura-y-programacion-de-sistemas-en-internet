/*=======================================================================================================
Deno deploy
https://docs.deno.com/deploy/manual

ENTREGA
- Enlace a una release de github

- Archivo comprimido generado en la release

- Enlace al despliegue de la aplicación en Deno Deploy.

=======================================================================================================*/

//=======================================================================================================
//  EXPRESS
//=======================================================================================================
//Así consigo la documentación de tipos de express
// @deno-types="npm:@types/express"

import express from "npm:express@4.18.2"; //Importo express

const app = express();
app.use(express.json());

//=======================================================================================================
//  .ENV
//=======================================================================================================
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; //Importo para cargar los .env

//Usar .env
//https://docs.deno.com/runtime/manual/basics/env_variables

//Deno.env
//https://deno.land/api@v1.37.2?s=Deno.Env

const env = await load(); //Cargo los .env

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); //Contemplo que se ejecute en Deno Deploy

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

//=======================================================================================================
//  MONGOOSE
//=======================================================================================================
import mongoose from "npm:mongoose@7.6.3"; //Importo mongoose

//Documentacion de mongoose
//https://www.npmjs.com/package/mongoose
//https://mongoosejs.com/docs/

/*
CUIDADO - LA URL DE MONGO ATLAS TIENE EN LA RUTA LA BASE DE DATOS A LA QUE CONECTARSE

MONGO_URL=mongodb+srv://<user>:<password>@cluster0.ioi135h.mongodb.net/

Nombre_Base_de_datos

?retryWrites=true&w=majority

Dentro de la base de datos, se crean las colecciones (tablas) que se necesiten, estas se corresponden con los modelos de mongoose
*/

//Intento la conexión a la base de datos AtlasMongoDB usando Mongoose
try {
    await mongoose.connect(MONGO_URL);
    console.log("Conexión exitosa a MongoDB");
} catch (error) {
    console.error("Error al conectar a MongoDB:", error);
}

//=======================================================================================================
//  IMPORT DE RESOLVERS
//=======================================================================================================

// import xxx from "./resolvers/xxx.ts";

// INICIO

import get_inicio from "./resolvers/get_inicio.ts";

// TARDIS

import get_tardis from "./resolvers/Tardis/get_tardis.ts";

import post_tardis from "./resolvers/Tardis/post_tardis.ts";

import put_tardis from "./resolvers/Tardis/put_tardis.ts";

import delete_tardis from "./resolvers/Tardis/delete_tardis.ts";

// DIMENSION

import get_dimension from "./resolvers/Dimension/get_dimension.ts";

import post_dimension from "./resolvers/Dimension/post_dimension.ts";

import put_dimension from "./resolvers/Dimension/put_dimension.ts";

import delete_dimension from "./resolvers/Dimension/delete_dimension.ts";

// PLANETA

import get_planeta from "./resolvers/Planeta/get_planeta.ts";

import post_planeta from "./resolvers/Planeta/post_planeta.ts";

import put_planeta from "./resolvers/Planeta/put_planeta.ts";

import delete_planeta from "./resolvers/Planeta/delete_planeta.ts";

// PERSONA

import get_persona from "./resolvers/Persona/get_persona.ts";

import post_persona from "./resolvers/Persona/post_persona.ts";

import put_persona from "./resolvers/Persona/put_persona.ts";

import delete_persona from "./resolvers/Persona/delete_persona.ts";

//=======================================================================================================
//  ENDPOINTS
//=======================================================================================================

app

// INICIO

.get("/", get_inicio)

// TARDIS

.get("/api/get_tardis/:id", get_tardis) // GET = Obtener X  -> Navegador/Postman

.post("/api/post_tardis", post_tardis) // POST = Nuevo X  -> POSTMAN -> Body -> raw -> JSON

.put("/api/update_tardis/:id", put_tardis) // PUT = Actualizar X -> POSTMAN -> Body -> raw -> JSON

.delete("/api/delete_tardis/:id", delete_tardis) // DELETE = Borrar X -> Navegador/Postman

// DIMENSION

.get("/api/get_dimension/:id", get_dimension) // GET = Obtener X  -> Navegador/Postman

.post("/api/post_dimension", post_dimension) // POST = Nuevo X  -> POSTMAN -> Body -> raw -> JSON

.put("/api/update_dimension/:id", put_dimension) // PUT = Actualizar X -> POSTMAN -> Body -> raw -> JSON

.delete("/api/delete_dimension/:id", delete_dimension) // DELETE = Borrar X -> Navegador/Postman

// PLANETA

.get("/api/get_planeta/:id", get_planeta) // GET = Obtener X  -> Navegador/Postman

.post("/api/post_planeta", post_planeta) // POST = Nuevo X  -> POSTMAN -> Body -> raw -> JSON

.put("/api/update_planeta/:id", put_planeta) // PUT = Actualizar X -> POSTMAN -> Body -> raw -> JSON

.delete("/api/delete_planeta/:id", delete_planeta) // DELETE = Borrar X -> Navegador/Postman

// PERSONA

.get("/api/get_persona/:id", get_persona) // GET = Obtener X  -> Navegador/Postman

.post("/api/post_persona", post_persona) // POST = Nuevo X  -> POSTMAN -> Body -> raw -> JSON

.put("/api/update_persona/:id", put_persona) // PUT = Actualizar X -> POSTMAN -> Body -> raw -> JSON

.delete("/api/delete_persona/:id", delete_persona) // DELETE = Borrar X -> Navegador/Postman

//=======================================================================================================
//  SERVER LISTENING
//=======================================================================================================
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});