import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import api from "@/plugins/axios";

export const useSeasonStore = defineStore('season', () => {
    const state = reactive({
        currentSeason: {},
    })

    const currentSeason = computed(() => state.currentSeason)

    const getSeasonDetails = async (tvId, seasonNumber) => {
        const response = await api.get(`/tv/${tvId}/season/${seasonNumber}`)
        state.currentSeason = response.data
    }
    return{
        currentSeason,
        getSeasonDetails
    }
})