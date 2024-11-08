import { hacerSolicitud } from "./fetch.js";
import { api_key } from "./key.js";

let pelis;
let page = 1;
const botonSiguiente = document.querySelector("#sigPagina");

pelis = await hacerSolicitud(
  `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}&api_key=${api_key}`
);

document.querySelector(".paginaActual").innerHTML = `
<h2>La pagina actual es: ${pelis.page}</h2>
<h2>El total de paginas es: ${pelis.total_pages}</h2>
`;

pelis.results.forEach((pelicula) => {
  document.querySelector(".contenedor").innerHTML += `
            <div class="pelicula">
                <img src="https://image.tmdb.org/t/p/w185/${pelicula.poster_path}">
                    <h2>${pelicula.name}</h2>
                </div>
        `;
});

botonSiguiente.onclick = async () => {
  // Primero aumenta la variable pagina en valor de uno en uno
  page++;
  // Luego se hace la solicitud a la API con pagina actualizada
  pelis = await hacerSolicitud(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}&api_key=${api_key}`
  );
  // Borramos la informacion de la pagina anterior
  document.querySelector(".contenedor").innerHTML = "";
  // Por ultimo, imprimir las peliculas actualizadas
  pelis.results.forEach((pelicula) => {
    document.querySelector(".contenedor").innerHTML += `
              <div class="pelicula">
                  <img src="https://image.tmdb.org/t/p/w185/${pelicula.poster_path}">
                      <h2>${pelicula.name}</h2>
                  </div>
          `;
  });
};
