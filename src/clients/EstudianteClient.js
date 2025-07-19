// src/clients/EstudianteClient.js

import axios from "axios";

const URL_API = "http://localhost:8081/api/matricula/v1/estudiantes";


let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdWNlLmVkdS5lYyIsInVwbiI6Im1pY29ycmVvQHVjZS5lZHUuZWMiLCJncm91cHMiOlsiYWRtaW4iXSwiaWF0IjoxNzUyOTAwNTM0LCJleHAiOjE3NTI5MDM1MzQsImp0aSI6IjBjMTI3MzI0LThhMTEtNGM5OS1hMzc0LTQ0YjQ3MjgwMzNlMiJ9.VYvKeqQMHkOD0NlO7G3Jd8jdbYTYNolGdgzD4EgY0Mr44fIXPOxxfFlE1W1H4AQUkz2BE2hyx3-OdkPFjkYbVA61ArsTjgUBd5DOdegBSPB77TK-XPyKLvPGLbNAOcgSXlKu3Des8rzDMuinSrXvq-AwMxHxcm5s109jgVeuFPlWz7AIy7n6ix6I87dIopvqFVf840zNyqxDjqOMH89rYoyfxg9sfPcb75U4hSBPXSbbImMLg2sOWVBLPZH8FPyH5RIIFVUpleYtvbQSzqOcN1S6UAinsyrkVL_QD9SYwP4R53T-RWMSoPXgyq426dCkxQpohAM7B33tc8ieH4ZsrQ";

const config = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // Buena práctica añadirlo
  },
});


const guardar = async (body) => {
  const response = await axios.post(`${URL_API}`, body, config());
  return response.data;
};

const actualizar = async (body, id) => {
  const response = await axios.put(`${URL_API}/${id}`, body, config());
  return response.data;
};

const actualizarParcial = async (body, id) => {
  const response = await axios.patch(`${URL_API}/${id}`, body, config());
  return response.data;
};

const borrar = async (id) => {
  const response = await axios.delete(`${URL_API}/${id}`, config());
  return response.data;
};

const consultarTodos = async (genero) => {
  const response = await axios.get(`${URL_API}?genero=${genero}`, config());
  return response.data;
};

const consultarPorId = async (id) => {
  const response = await axios.get(`${URL_API}/${id}`, config());
  return response.data;
};

// --- FACHADAS ---

export const guardarFachada = async (body) => {
  return await guardar(body);
};

export const actualizarFachada = async (body, id) => {
  return await actualizar(body, id);
};

export const actualizarParcialFachada = async (body, id) => {
  return await actualizarParcial(body, id);
};

export const borrarFachada = async (id) => {
  return await borrar(id);
};

export const consultarTodosFachada = async () => {
  try {
   
    const [estudiantesM, estudiantesF] = await Promise.all([
      consultarTodos('M'), 
      consultarTodos('F')  
    ]);

    const todosLosEstudiantes = [...estudiantesM, ...estudiantesF];
    
    return todosLosEstudiantes;

  } catch (error) {
    console.error("Error al consultar estudiantes por género:", error);
    throw error;
  }
};
export const consultarPorIdFachada = async (id) => { 
 return await consultarPorId(id);
};