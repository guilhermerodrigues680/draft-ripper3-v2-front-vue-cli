import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const brtChildrenRoutes = [
  {
    path: '',
    redirect: 'home'
  },
  {
    path: 'home',
    name: 'Home',
    component: Home
  },
  {
    path: 'about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: 'cadastro-classificacao-linha',
    name: 'CadastroClassificaoLinha',
    component: () => import('../views/CadastroClassificaoLinha.vue')
  },
  {
    path: 'operadoras-financeiras',
    name: 'OperadorasFinanceiras',
    component: () => import('../views/OperadorasFinanceiras.vue')
  },
  {
    path: 'cadastro-classificacao-pernas',
    name: 'CadastrarClassificacaoPernas',
    component: () => import('../views/CadastrarClassificacaoPernas.vue')
  },
  {
    path: 'visualizacao-viagens-classificadas',
    name: 'VisualizacaoViagensClassificadas',
    component: () => import('../views/VisualizacaoViagensClassificadas.vue')
  },
  {
    path: 'viagens-classificadas',
    name: 'ViagensClassificadas',
    component: () => import('../views/ViagensClassificadas.vue')
  },
  {
    path: 'processamento-config',
    name: 'ProcessamentoConfig',
    component: () => import('../views/ProcessamentoConfig.vue')
  },
  {
    path: '*',
    name: 'Pagina404',
    component: () => import('../views/Pagina404.vue')
  },
];

const routes = [
  {
    path: '/',
    redirect: '/seleciona-brt'
  },
  {
    path: '/seleciona-brt',
    name: 'SelecionaBRT',
    component: () => import('../views/SelecionaBRT.vue')
  },
  {
    path: '/api-doc',
    name: 'APIDoc',
    component: () => import('../views/APIDoc.vue')
  },
  {
    path: '/brt/:idBRT(\\d+)',
    component: () => import('../views/MainBRT.vue'),
    children: brtChildrenRoutes
  },
  {
    path: '*',
    redirect: '/seleciona-brt'
  },
]

const router = new VueRouter({
  routes
})

export default router
