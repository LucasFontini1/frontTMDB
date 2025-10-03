import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import tvView from '@/views/tvView.vue'
import movieView from '@/views/moviesView.vue'
import movieDetailsView from '@/views/MovieDetailsView.vue'
import tvDetailsView from '@/views/tvDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tv',
      name: 'tv',
      component: tvView,
    },
    {
      path: '/filmes',
      name: 'movie',
      component: movieView,
    },
    {
      path: '/movie/:movieId',
      name: 'movieDetails',
      component: movieDetailsView,
      props: true,
    },
    {
      path: '/tv/:tvId',
      name: 'tvDetails',
      component: tvDetailsView,
      props: true
    }
  ],
})

export default router
