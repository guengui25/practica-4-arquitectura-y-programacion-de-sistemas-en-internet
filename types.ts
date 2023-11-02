//Creo y exporto los tipos de datos que voy a usar

export type Tardis = {
  camuflaje: string;
  numero_regeneracion: number;
  ano: number;
  dimensiones: Dimension[];
}

export type Dimension = {
  id: string;
  planetas: Planeta[];
};

export type Planeta = {
  id: string;
  personas: Persona[];
};

export type Persona = {
  nombre: string;
  id: string;
};

  
/*
Dimensiones --> Con los planetas visitados en la misma
Planetas --> Con las personas relevantes a las experiencias en el mismo
Personas

Actual camuflaje de la TARDIS
Número de regeneración del Time Lord que la use
Año en el que se encuentra actualmente
*/