import axios from "axios";
const URL_API= 'http://localhost:8081/api/matricula/v1/estudiantes'
//Guardar , vamos a entender como funciona el backend

// public void guardar (@RequestBody EstudianteTo estudianteTo)

const guardar = async (body) => {
  const data = axios
    .post(`${URL_API}`, body)
    .then((r) => r.data);
  console.log(data);
};

//acutalizar
//public Response actualizar(@RequestBody EstudianteTo estudianteTo, @PathParam("id") Integer id,
// @Context UriInfo uriInfo)

const actualizar = async (body, id) => {
  axios
    .put(`${URL_API}/${id}`, body)
    .then((r) => r.data);
};

//actualizar parcial
// public Response actualizarParcial(@RequestBody EstudianteTo estudianteTo,
//  @PathParam("id") Integer id, @Context UriInfo uriInfo)
const actualizarParcial = async (body, id) => {
  axios
    .patch(`${URL_API}/${id}`, body)
    .then((r) => r.data);
};

//borrar

const borrar = async (id) => {
  axios
    .delete(`${URL_API}/${id}`)
    .then((r) => r.data);
};

//fachadas

export const guardarFachada = async (body) => {
  await guardar(body);
};

export const actualizarFachada = async (body, id) => {
  await actualizar(body, id);
};

export const actualizarParcialFachada = async (body, id) => {
  await actualizarParcial(body, id);
};

export const borrarFachada = async (id) => {
  await borrar(id);
};
