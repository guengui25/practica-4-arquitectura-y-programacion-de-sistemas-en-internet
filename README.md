# Doctor Who

Doctor Who cumple 60 años y los episodios especiales están a la vuelta de esquina, así que vamos a hacer un API REST para ayudar a la TARDIS (Time And Relative Dimension In Space) organizarse ante la nueva reiterada llegada de David Tennant.

La Tardis guarda los siguientes datos en sus memorias Gallifreyanas según lo que ha visitado en sus diferentes viajes.
- Dimensiones  --> Con los planetas visitados en la misma
- Planetas --> Con las personas relevantes a las experiencias en el mismo
- Personas
- Actual camuflaje de la TARDIS
- Número de regeneración del Time Lord que la use
- Año en el que se encuentra actualmente

Las dimensiones, planetas y personas se deberán guardar en diferentes colecciones de mongo atlas y ser relacionadas por id's entre si llegando a una sola final en la que se guarde cada TARDIS.

El api deberá de poseer llamadas para ver, crear y modificar TARDISs además de todos los elementos de su interior, cada llamada tendrá que ser del método requerido por su funcionalidad.

----------------------------------------------------------------------------------------------------------------------

En el repositorio el readme deberá funcionar como documentación del API indicando todos los endpoints y parámetros necesarios para su uso.

El uso de mongo y la publicación en deno deploy es obligatoria.

-----------------------------------------------------------------------------------------------------------------------

Un archivo no ejecutable mediante deno por algún tipo de error no será corregido y por tanto evaluado automáticamente con un 0.

El trabajo será exclusivamente individual sin permitir hacer parejas o entregas conjuntas de ningún tipo.

La entrega se hará en una  release de GitHub en un repositorio antes del día 15 de Noviembre a las 11:00 AM, un trabajo que no cumpla esta cláusulas de entrega será evaluado automáticamente con un 0.