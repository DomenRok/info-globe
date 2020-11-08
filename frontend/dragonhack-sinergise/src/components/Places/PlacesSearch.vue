<template>
  <div class="agolia-places z-index-500" id="places-agola">
    <div class="p-grid controlls-container">
      <div class="p-col-8 button-label z-index-500 relative flex-quarter">
        <Button class="button-component p-button-success" 
        disabled="disabled"
        @click="toggleType" 
        v-show="this.type === 'city'" 
        label="Enter City" />

        <Button class="button-component p-button-success" 
        disabled="disabled"
        @click="toggleType" 
        v-show="this.type === 'country'" 
        label="Enter Country" />
      </div>
      <div class="p-col-8 search-bar-container z-index-500 relative flex-quarter">
        <app-places
          :type="type"
          :api-key="apiKey"
          :app-id="appId"
          :key="`${appId}-${apiKey}`"
          @change="onChangeSuggestedPlace"
      />
      </div>

    <div class="p-col-2 button-container relative flex-quarter">
        <Button class="button-component" @click="toggleType" v-show="this.type === 'city'" label="Show Country" />
        <Button class="button-component" @click="toggleType" v-show="this.type === 'country'" label="Show City" />

      </div>
      <div class="p-col-2 relative flex-quarter">
        <Calendar v-model="dateVal" 
        class="calendar-component"
        :showIcon="true"
        selectionMode="range" 
        dateFormat="yy-mm-dd" 
        @date-select="addDateFunc" 
        :monthNavigator="true" 
        :yearNavigator="true" 
        yearRange="2015:2020"/>
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
    display: flex;
    position: absolute;
    right: 90px;
    top: 10px;
    width: 900px;
    flex-direction: row ;
    flex-wrap: wrap;
  }
  .z-index-500{
    z-index: 500;
  }
  .relative{
    text-align: right;
  }


  .flex-quarter {
    width: 23%;
  }

  .controlls-container {
    width: 1000px;
  }

  .search-bar-container {
    height: 50px;
    padding-left: 0;
  }
  
  .button-container {
    margin-right: 5px;
  }

  .button-component {
    width: 135px;
    opacity: 1;
  }

  .button-label {
    padding-right: 0;
  }

</style>