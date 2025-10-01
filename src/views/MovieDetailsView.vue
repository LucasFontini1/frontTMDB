<script setup>
import { defineProps, onMounted } from 'vue';
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();

const props = defineProps({
    movieId: {
        type: Number,
        required: true
    }
});
onMounted(async () => {
    await moviesStore.getMovieDetails(props.movieId);
});
</script>
<template>
    <div class="main">
        <div class="content">
            <img :src="`https://image.tmdb.org/t/p/w185${moviesStore.currentMovie.poster_path}`"
                :alt="moviesStore.currentMovie.title">
            <div class="details">
                <h1>{{ moviesStore.currentMovie.title }}</h1>
                <p>{{ moviesStore.currentMovie.tagline }}</p>
                <p>{{ moviesStore.currentMovie.overview }}</p>
                <p>Orçamento: ${{ moviesStore.currentMovie.budget }}</p>
                <p>Avaliação: {{ moviesStore.currentMovie.vote_average }}</p>
            </div>
        </div>
    </div>
    <p>Produtoras</p>
    <div class="companies">
        <template v-for="company in moviesStore.currentMovie.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                :alt="company.name" />
            <p v-else>{{ company.name }}</p>
        </template>
    </div>
</template>
<style scoped>
  .companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
  }
</style>