import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import EstuidanteView from "../views/EstudianteView.vue";
function estaAutenticado(){
  let result = localStorage.getItem('auth')=== 'true'
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  //asi es como se declara un guardia, este se ejecuta antes de que se ingrese en cada pagina 
  if(to.meta.requireAutenticacion){
    console.log('Auth');
    //si no esta autenticado
    if(!estaAutenticado()){
      next('/login')
    }else{
      next();
    }

  }else{
    next();
  }
})

export default router;
