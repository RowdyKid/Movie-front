import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Layout',
      component: () => import('../layout/Layout.vue'),
      redirect: '/home',
      children:[
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/watchList',
          name: 'WatchList',
          component: () => import('../views/RecommendList.vue')
        },
        {
          path: '/searchResults',
          name: 'SearchResults',
          component: () => import('../views/SearchResults.vue')
        },
        {
          path: '/searchPerson',
          name: 'SearchPerson',
          component: () => import('../views/SearchPerson.vue')
        },
        {
          path: '/searchCompanies',
          name: 'SearchCompanies',
          component: () => import('../views/SearchCompanies.vue')
        },
        {
          path: '/searchKeywords',
          name: 'SearchKeywords',
          component: () => import('../views/SearchKeywords.vue')
        },
        {
          path: '/personCenter',
          name: 'PersonCenter',
          component: () => import('../views/PersonCenter.vue'),
        },
        {
          path: '/movies/details/:id',
          name: 'Detail',
          component: () => import('../views/Detail.vue')
        },
      ]
    },
    {
      path: '/management',
      name: 'Management',
      component: () => import('../layout/Management.vue'),
      children:[
        {
          path: 'welcome',
          name: 'Welcome',
          component: () => import('../views/Welcome.vue')
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('../views/ManageUser.vue')
        },
        {
          path: 'movie',
          name: 'Movie',
          component: () => import('../views/ManageMovie.vue')
        },
      ]
    },
    {
      path: '/results',
      name: 'Results',
      component: () => import('../views/SearchResults.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/ManageUser.vue')
    },

  ]
})

export default router
