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
      <p class="link">
      <router-link class="p" :to="{ name: 'tvDetails', params: { tvId: props.tvId } }">Voltar</router-link>
      </p>
        <p class="image">
            <img style="width: 20rem; height: 30rem; object-fit: cover; border: 1px black solidz;" class="aw" :src="`https://image.tmdb.org/t/p/w185${seasonStore.currentSeason.poster_path}`" alt="">
        </p>
      <h1 class="tittle">{{ seasonStore.currentSeason.name }}</h1>
      <p class="overview">{{ seasonStore.currentSeason.overview }}</p>

      <ul class="episodes">
        <li v-for="episode in seasonStore.currentSeason.episodes" :key="episode.id">
          <div>
            <h3>{{ episode.episode_number }} - {{ episode.name }}</h3>
            <p>{{ episode.overview }}</p>
          </div>
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
.link{
  text-align: center;
  
  & .p{
    color: black;
    text-decoration: none;
    font-size: 2rem;

    &:hover{
      text-decoration: underline;
    }
  }
}
.content{
  display: flex;
  flex-direction: column;
  justify-content: center; 
  margin: 1rem 0 1rem 0;
}

p.image{
  text-align: center;

  &.aw{
    width: 20rem;
  }
}


.tittle{
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
}
.overview{
  text-align: center;
  font-size: 1rem;
  width: 80%;
  margin: 0 auto;
}

ul.episodes{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 2rem;
  list-style: none;
  margin-top: 5rem;

  & li{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 32%;
    padding: 1rem;
    box-shadow: 0 0 0.8rem #000;
  }
}

ul.episodes li h3{
  text-align: center;
  font-size: 2rem;
}

ul.episodes li p{
  text-align: center;
}

ul.episodes li img{
  width: 100%;
}
</style>
