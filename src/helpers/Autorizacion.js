export function obtenerPaginasPermitidas(usuario) {
  let arreglo;
  if (usuario === "admin") {
    //paginas del admin

    arreglo = [
      "/about",
      "/notasIngreso",
      "/recursoProhibido",
      "/estudiante",
      "/home",
    ];
  }

  if (usuario === "estudiante") {
    //paginas de estudiante
    arreglo = ["/about", "/recursoProhibido", "/estudiante", "/home"];
  }
  return arreglo;
}
