<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useSeasonStore } from '@/stores/season';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';

const seasonStore = useSeasonStore();
const isLoading = ref(false);
const router = useRouter();

const props = defineProps({
  tvId: {
    type: Number,
    required: true
  },
  seasonNumber: {
    type: Number,
    required: true
  }
});

onMounted(async () => {
  isLoading.value = true;
  await seasonStore.getSeasonDetails(props.tvId, props.seasonNumber);
  isLoading.value = false;
});

function openSeason(tvId, seasonNumber) {
  router.push({ name: 'seasonDetails', params: { tvId, seasonNumber } });
}
</script>

<template>
  <main>
    <div class="content">
      <router-link class="p" :to="{ name: 'tvDetails', params: { tvId: props.tvId } }">Voltar</router-link>
        <p class="image">
            <img :src="`https://image.tmdb.org/t/p/w185${seasonStore.currentSeason.poster_path}`" alt="">
        </p>
      <h1 class="tittle">{{ seasonStore.currentSeason.name }}</h1>
      <p class="overview">{{ seasonStore.currentSeason.overview }}</p>

      <ul class="episodes">
        <li v-for="episode in seasonStore.currentSeason.episodes" :key="episode.id">
          <h3>{{ episode.episode_number }} - {{ episode.name }}</h3>
          <p>{{ episode.overview }}</p>
          <img
            v-if="episode.still_path"
            :src="`https://image.tmdb.org/t/p/w300${episode.still_path}`"
            :alt="episode.name"
          />
        </li>
      </ul>
    </div>

    <loading v-model:active="isLoading" is-full-page />
  </main>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 60%;
  margin: 2rem auto;
}

.p {
  text-align: center;
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
}

.tittle {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #000;
}

.overview {
  text-align: center;
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
}

ul.episodes {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
}

ul.episodes li {
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

ul.episodes li h3 {
  margin-bottom: 0.5rem;
}

ul.episodes li img {
  width: 100%;
  border-radius: 6px;
  margin-top: 1rem;
}
.image{
text-align: center;
}

</style>
