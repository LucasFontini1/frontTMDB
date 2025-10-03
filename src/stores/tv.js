import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import { computed, reactive } from 'vue'

export const useTvStore = defineStore('tv', () => {
  const state = reactive({
    currentTv: {},
  })

  const currentTv = computed(() => state.currentTv)

  const getTvDetails = async (tvId) => {
    const response = await api.get(`/tv/${tvId}`)
    state.currentTv = response.data
  }

  return { currentTv, getTvDetails }
})
