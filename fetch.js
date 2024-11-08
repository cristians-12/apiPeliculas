export const hacerSolicitud = async (url) => {
  const respuesta = await fetch(url);
  const informacion = await respuesta.json();
  return informacion;
};
