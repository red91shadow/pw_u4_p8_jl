import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import EstuidanteView from "../views/EstudianteView.vue";
import About from "../views/AboutView.vue";
import NotasIngreso from "../views/NotasIngreso.vue";
import RecursoProhibido from "../views/RecursoProhibido.vue";
import { obtenerPaginasPermitidas } from "../helpers/Autorizacion.js";

function estaAutenticado() {
  let result = localStorage.getItem("auth") === "true";
  console.log(result);
  return result;
}

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      requireAutenticacion: true, //protegida

      //para proteger una ruta se ocupan "Guardianes"
    },
  },
  {
    path: "/estudiante",
    name: "estudiante",
    component: EstuidanteView,
    meta: {
      requireAutenticacion: true, //protegida

      //para proteger una ruta se ocupan "Guardianes"
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },

  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      requireAutenticacion: true, //protegida
    },
  },
  {
    path: "/notasIngreso",
    name: "notasIngreso",
    component: NotasIngreso,
    meta: {
      requireAutenticacion: true, //protegida
    },
  },
  {
    path: "/recursoProhibido",
    name: "recursoProhibido",
    component: RecursoProhibido,
    meta: {
      requireAutenticacion: true, //protegida
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  //asi es como se declara un guardia, este se ejecuta antes de que se ingrese en cada pagina
  if (to.meta.requireAutenticacion) {
    console.log("Auth");
    //si no esta autenticado
    if (!estaAutenticado()) {
      next("/login");
    } else {
      //aqui valida si esta autorizado
      let usuario = localStorage.getItem("usuario");
      let paginas = obtenerPaginasPermitidas(usuario);
      if (paginas.includes(to.path)) {
        next();
      } else {
        next("/recursoProhibido");
      }
    }
  } else {
    next();
  }
});

export default router;
