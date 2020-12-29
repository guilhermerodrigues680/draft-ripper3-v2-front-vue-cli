import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cadastro-classificacao-linha',
    name: 'CadastroClassificaoLinha',
    component: () => import('../views/CadastroClassificaoLinha.vue')
  },
  {
    path: '/cadastro-classificacao-pernas',
    name: 'CadastrarClassificacaoPernas',
    component: () => import('../views/CadastrarClassificacaoPernas.vue')
  },
  {
    path: '/viagens-classificadas',
    name: 'ViagensClassificadas',
    component: () => import('../views/ViagensClassificadas.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
