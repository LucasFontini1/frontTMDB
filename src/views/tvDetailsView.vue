<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useTvStore } from '@/stores/tv';
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router';

const tvStore = useTvStore();
const isLoading = ref(false)
const props = defineProps({
    tvId: {
        type: Number,
        required: true
    }
})
const router = useRouter();

onMounted(async () => {
    isLoading.value = true
    await tvStore.getTvDetails(props.tvId);
    isLoading.value = false
});

function openSeason(tvId, seasonNumber){
    router.push({name: 'seasonDetails', params: {tvId:tvId, seasonNumber:seasonNumber}})
}
</script>
<template>
    <main>
        <div class="content">
            <router-link class="p" to="/tv">Voltar</router-link>
            <p class="image">
                <img :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTv.poster_path}`"
                    :alt="tvStore.currentTv.name">
            </p>
            <h1 class="tittle">{{ tvStore.currentTv.original_name }}</h1>
            <p class="firstDate">{{ tvStore.currentTv.first_air_date }}</p>
            <p class="tagline">{{ tvStore.currentTv.tagline }}</p>
            <p class="overview">{{ tvStore.currentTv.overview }}</p>
            <p class="average">Avaliação: {{ tvStore.currentTv.vote_average }}</p>
            <ul class="genres">
                <li v-for="genre in tvStore.currentTv.genres" :key="genre.id">
                    <p>{{ genre.name }}</p>
                </li>
            </ul>
            <ul class="seasons">
                <li @click="openSeason(props.tvId, season.season_number)" v-for="season in tvStore.currentTv.seasons" :key="season.id">
                    <h2 class="seasonName">{{ season.name }}</h2>
                    <img :src="`https://image.tmdb.org/t/p/w185${season.poster_path}`" alt="">
                </li>
            </ul>
        </div>
        <loading v-model:active="isLoading" is-full-page></loading>
    </main>
</template>
<style scoped>
.content{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
    margin: 2rem auto;

}

.p{
    text-align: center;
    font-size: 1.5rem;
    text-decoration: none;
    color: black;
}

.image {
    text-align: center;

    & img {
        border-radius: 8px;
        max-width: 100%;
        height: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 15rem;
    }
}
.tittle{
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    color: #000;
}
.firstDate{
    text-align: center;
    font-size: 0.8rem;
    color: #7a7a7a
}
.tagline{
    text-align: center;
    font-size: 1.3rem;
    color: black;
}
.overview{
    text-align: center;
    font-size: 0.8rem,;
}
.average{
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
}
ul.genres{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}
ul.genres li{
    list-style: none;
    font-size: 1rem;
    background-color: #748708;
    color: white;
    padding: 0.5rem;
    min-width: 32%;
    text-align: center;

}
ul.seasons{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    
}
ul.seasons li{
    list-style: none;
    text-align: center;
    width: 32%;
    box-shadow: 0 0 0.5rem #000;
    margin-bottom: 1rem;
    padding: 0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    
}

ul.seasons li img{
    width: 100%;
    height: 90%;
    object-fit: cover;
    border-radius: 0  0  10px 10px;
}
</style>