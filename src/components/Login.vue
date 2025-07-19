<template>
  <div class="login-container">
    <div class="login-caja">
      <h2>Iniciar Sesion</h2>
      <input v-model="username" type="text" placeholder="Usuario" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="login()">Ingresar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    // local storage es el repositorio donde se guardan los datos de sesion
    login() {
      if (
        (this.username === "admin" || this.username === "estudiante") &&
        this.password === "123"
      ) {
        localStorage.setItem("usuario", this.username);
        localStorage.setItem("auth", "true"); //bandera que me indique al sistema que se autentifico
        //redireccionar a la pagina de bienvenida
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(144, 228, 159);
  height: 100vh; /* estandar para centrar un elemento*/
  width: 100vw;
}

.login-caja {
  background: plum;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid white;
}

button {
  width: 100%;
  padding: 10px;
  background: rgb(117, 214, 134);
  border: none;
  border-radius: 6px;
  color: black;
  cursor: pointer;
}
</style>