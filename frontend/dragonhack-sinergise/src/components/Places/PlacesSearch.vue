<template>
  <div class="agolia-places  p-shadow-23 z-index-500" id="places-agola">
    <div class="p-grid controlls-container">
      <div class="p-col-2 search-bar-container z-index-500 relative">
        <app-places
          :type="type"
          :api-key="apiKey"
          :app-id="appId"
          :key="`${appId}-${apiKey}`"
          @change="onChangeSuggestedPlace"
      />
      </div>

    <div class="p-col-2 button-container relative">
        <Button @click="toggleType" label="Toggle Type" />

      </div>
      <div class="p-col-2 button-container relative">
        <Button @click="toggleApiKey" label="Toggle API Key" />
      </div>
      <div>
        <Calendar v-model="dateVal" selectionMode="range" dateFormat="yy-mm-dd" @date-select="addDateFunc" />
      </div>
    </div> 
  </div>
</template>

<script>
import AppPlaces from './Places.vue';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import {
  mapGetters,
  mapActions
} from "vuex";


export default {
  components: { 
    AppPlaces,
    Button,
    Calendar
   },
  computed: mapGetters(["suggestedPlace","getDate"]),
  data() {
    return {
      appId: undefined,
      apiKey: undefined,
      type: 'city',
      dateVal: null
    };
  },
  watch: {
    dateVal() {
      let d = new Date(this.$store.getters.getDate[0])
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      console.log(`${ye}-${mo}-${da}`);
    }
  },
  methods: {
    ...mapActions(["addSuggestedPlace", "addDate"]),
    onChangeSuggestedPlace(suggest) {
      this.addSuggestedPlace(suggest.suggestion);
    },
    addDateFunc() {
      this.addDate(this.dateVal)
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
    position: absolute;
    right: 170px;
    top: 10px
  }
  .z-index-500{
    z-index: 500;
  }
  .relative{
    width: 100%;
    text-align: right;
    
  }
  .controlls-container {
    display: block;
    width: 265px;
  }

  .search-bar-container {
    height: 50px;
  }

</style>