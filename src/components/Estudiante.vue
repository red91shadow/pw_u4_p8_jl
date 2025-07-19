<template>
  <div class="container">
    <h2>Gestión de Estudiantes</h2>

    <h3>Agregar estudiante</h3>
    <form @submit.prevent="guardar">
      <input v-model="nuevo.nombre" placeholder="Nombre" required />
      <input v-model="nuevo.apellido" placeholder="Apellido" required />
      <input v-model="nuevo.fechaNacimiento" type="date" required />
      <input v-model="nuevo.genero" placeholder="Género (M/F)" required />
      <button type="submit">Guardar</button>
    </form>

    <h3>Actualizar estudiante</h3>
    <form @submit.prevent="actualizar">
      <input v-model.number="actualizarData.id" placeholder="ID" required />
      <input v-model="actualizarData.nombre" placeholder="Nombre" required />
      <input v-model="actualizarData.apellido" placeholder="Apellido" required />
      <input v-model="actualizarData.fechaNacimiento" type="date" required />
      <input v-model="actualizarData.genero" placeholder="Género" required />
      <button type="submit">Actualizar</button>
    </form>

    <h3>Actualizar solo apellido</h3>
    <form @submit.prevent="actualizarParcial">
      <input
        v-model.number="actualizarParcialData.id"
        placeholder="ID"
        required
      />
      <input
        v-model="actualizarParcialData.apellido"
        placeholder="Nuevo Apellido"
        required
      />
      <button type="submit">Actualizar Parcial</button>
    </form>

    <h3>Borrar estudiante</h3>
    <form @submit.prevent="borrar">
      <input v-model.number="idBorrar" placeholder="ID a borrar" required />
      <button type="submit">Borrar</button>
    </form>

    <h3>Lista de Estudiantes</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="width: 100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha Nacimiento</th>
          <th>Género</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in estudiantes" :key="est.id">
          <td>{{ est.id }}</td>
          <td>{{ est.nombre }}</td>
          <td>{{ est.apellido }}</td>
          <td>{{ est.fechaNacimiento }}</td>
          <td>{{ est.genero }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada,
  consultarTodosFachada,
} from "../clients/EstudianteClient";

export default {
  data() {
    return {
      estudiantes: [],
      nuevo: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "",
      },
      actualizarData: {
        id: null,
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "",
      },
      actualizarParcialData: {
        id: null,
        apellido: "",
      },
      idBorrar: null,
    };
  },
  mounted() {
    this.cargarEstudiantes();
  },
  methods: {
    async cargarEstudiantes() {
      try {
        this.estudiantes = await consultarTodosFachada();
        if (!this.estudiantes) {
          this.estudiantes = [];
        }
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
        alert(
          "No se pudieron cargar los estudiantes. Revisa la consola para más detalles (puede ser un error de CORS o el token expirado)."
        );
        this.estudiantes = [];
      }
    },

    async guardar() {
      try {
        const body = {
          ...this.nuevo,
          fechaNacimiento: this.nuevo.fechaNacimiento + "T00:00:00",
        };
        await guardarFachada(body);
        this.limpiarForm("nuevo");
        await this.cargarEstudiantes();
      } catch (error) {
        console.error("Error al guardar estudiante:", error);
        alert("Error al guardar el estudiante.");
      }
    },

    async actualizar() {
      try {
        const { id, ...rest } = this.actualizarData;
        const body = {
          ...rest,
          fechaNacimiento: this.actualizarData.fechaNacimiento + "T00:00:00",
        };
        await actualizarFachada(body, id);
        this.limpiarForm("actualizarData");
        await this.cargarEstudiantes();
      } catch (error) {
        console.error("Error al actualizar estudiante:", error);
        alert("Error al actualizar el estudiante.");
      }
    },

    async actualizarParcial() {
      try {
        const { id, apellido } = this.actualizarParcialData;
        await actualizarParcialFachada({ apellido }, id);
        this.limpiarForm("actualizarParcialData");
        await this.cargarEstudiantes();
      } catch (error) {
        console.error("Error al actualizar parcialmente:", error);
        alert("Error al actualizar el apellido.");
      }
    },

    async borrar() {
      try {
        await borrarFachada(this.idBorrar);
        this.idBorrar = null;
        await this.cargarEstudiantes();
      } catch (error) {
        console.error("Error al borrar estudiante:", error);
        alert("Error al borrar el estudiante.");
      }
    },

    limpiarForm(form) {
      if (form === "nuevo") {
        this.nuevo = {
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          genero: "",
        };
      } else if (form === "actualizarData") {
        this.actualizarData = {
          id: null,
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          genero: "",
        };
      } else if (form === "actualizarParcialData") {
        this.actualizarParcialData = { id: null, apellido: "" };
      }
    },
  },
};
</script>

<style></style>