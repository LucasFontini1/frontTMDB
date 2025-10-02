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
            <p class="image">
                <img :src="`https://image.tmdb.org/t/p/w185${moviesStore.currentMovie.poster_path}`"
                    :alt="moviesStore.currentMovie.title" class="poster" />
            </p>
            <div class="details">
                <h1 class="tittle">{{ moviesStore.currentMovie.title }}</h1>
                <p class="tagline">{{ moviesStore.currentMovie.tagline }}</p>
                <p class="overview">{{ moviesStore.currentMovie.overview }}</p>
                <p class="budget">Orçamento: ${{ moviesStore.currentMovie.budget }}</p>
                <p class="average">Avaliação: {{ moviesStore.currentMovie.vote_average }}</p>
            </div>
        </div>
        <p style="text-align: center; font-size: 2rem; color: black;">Produtoras</p>
        <div class="companies">
            <div class="test" v-for="company in moviesStore.currentMovie.production_companies" :key="company.id">
                <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                    :alt="company.name" />    
                <p v-else>{{ company.name }}</p>
            </div>
        </div>
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

.content {
    margin: auto;
    padding: 2rem;
}

.image {
    text-align: center;
}

.details {
    display: flex;
    flex-direction: column;
    column-gap: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    gap: 1.5rem;
}

.poster {
    border-radius: 8px;
    max-width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 15rem;
}

.tittle {
    font-size: 2rem;
    font-weight: bold;
    color: black;
}

.tagline {
    font-style: italic;
    color: #555;
}

.overview {
    font-size: 1rem;
    color: #333;
}

.budget,
.average {
    font-size: 1rem;
    color: #777;
}
.main {
    background-color: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;   
}
.test img {
    max-height: 50px;
    object-fit: contain;
}
</style>