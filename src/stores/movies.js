import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMoviesStore = defineStore('movies', () => {
  const state = reactive({
    currentMovie: {},
  })

  const currentMovie = computed(() => state.currentMovie)

  const getMovieDetails = async (movieId) => {
    const response = await api.get(`/movie/${movieId}`)
    state.currentMovie = response.data
  }

  return {
    currentMovie,
    getMovieDetails,
  }
})
