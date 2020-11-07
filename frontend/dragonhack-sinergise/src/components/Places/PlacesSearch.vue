<template>
  <div class="agolia-places p-grid" id="places-agola">
    <div class="p-col-2 search-bar-container">
      <app-places
        :type="type"
        :api-key="apiKey"
        :app-id="appId"
        :key="`${appId}-${apiKey}`"
        @change="onChangeSuggestedPlace"
    />
    </div>
    <div class="p-col-1 button-container">
      <Button @click="toggleType" label="Toggle Type" />

    </div>
    <div class="p-col-1 button-container">
      <Button @click="toggleApiKey" label="Toggle API Key" />
    </div>
    <pre>Ime kraja v storu: {{ suggestedPlace.name }}</pre>
  </div>
</template>

<script>
import AppPlaces from './Places.vue';
import {
  mapGetters,
  mapActions
} from "vuex";
import Button from 'primevue/button';

export default {
  components: { 
    AppPlaces,
    Button
   },
  computed: mapGetters(["suggestedPlace"]),
  data() {
    return {
      appId: undefined,
      apiKey: undefined,
      type: 'city',
    };
  },
  methods: {
    ...mapActions(["addSuggestedPlace"]),
    onChangeSuggestedPlace(suggest) {
      this.addSuggestedPlace(suggest.suggestion);
    },
    toggleApiKey() {
      if (this.apiKey) {
        this.apiKey = undefined;
        this.appId = undefined;
      } else {
        this.apiKey = 'your-api-key';
        this.appId = 'your-appId-key';
      }
    },
    toggleType() {
      if (this.type === 'city') {
        this.type = 'country';
      } else {
        this.type = 'city';
      }
    },
  },
};
</script>

<style scoped>
  .agolia-places {
    height: 15vh;
  }
  .search-bar-container, .button-container{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>