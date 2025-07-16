<template>
  <div class="container">
    <button v-on:click="guardar()">Guardar</button>
    <button v-on:click="actualizar()">Actualizar</button>
    <button v-on:click="actualizarParcial()">Actualizar Parcial</button>
    <button v-on:click="borrar()">Borrar</button>
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada,
} from "../clients/EstudianteClient";
export default {
  methods: {
    async guardar() {
      let fecha = "2000-12-25";
      //estructura (body) del estudiante
      const estudianteToBody = {
        nombre: "Joel",
        apellido: "Luna",
        fechaNacimiento: fecha + "T00:00:00",
        genero: "M",
      };
      await guardarFachada(estudianteToBody);
    },

    async actualizar() {
      let fecha = "2003-11-03";
      const estudianteToBody = {
        nombre: "James",
        apellido: "Luna",
        fechaNacimiento: fecha + "T00:00:00",
        genero: "M",
      };
      await actualizarFachada(estudianteToBody, 1);
    },

    async actualizarParcial() {
      const estudianteToBody = {
        apellido: "Asimov",
      };
      await actualizarParcialFachada(estudianteToBody, 1);
    },

    async borrar() {
      await borrarFachada(2);
    },
  },
};
</script>

<style>
</style>