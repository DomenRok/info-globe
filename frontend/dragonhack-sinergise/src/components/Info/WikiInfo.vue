<template>
  <div id="tabs" class="container">
      <div class="tabs">
        <a v-on:click="activetab='1'" v-bind:class="[ activetab === '1' ? 'active' : '' ]">Wiki info</a>
        <a v-on:click="activetab='2'" v-bind:class="[ activetab === '2' ? 'active' : '' ]">Graphs</a>
    </div>

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div class="content">
        <div v-if="activetab ==='1' && cityInfo" class="tabcontent">
            <table>
              <tr><td class="legend">Area:</td><td class="data">{{cityInfo.area.value}} km<sup>2</sup></td><td rowspan="5"><img class="map" src="https://drive.google.com/thumbnail?id=1edVL631_KOzd5zXzwrDNbn7bZDxqcRUQ"></td></tr>
              <tr><td class="legend">Population:</td><td class="data">{{cityInfo.population.value}} million</td></tr>
              <tr><td class="legend">Capital:</td><td class="data">{{cityInfo.name}}</td></tr>
              <tr><td class="legend">Language:</td><td class="data">{{cityInfo.countryLabel.value}}</td></tr>
              <tr><td class="legend" valign="top">Flag:</td><td class="data"><img class="flag" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/900px-Flag_of_France.svg.png" width="80"></td></tr>
            </table>
            <div class="summary">
                Test
            </div>
        </div>
        <div v-if="activetab ==='2'" class="tabcontent">
            Not made yet
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SPARQLQueryDispatcher from './SPARQLQueryDispatcher'

export default {
    name: 'WikiInfo',
    computed: mapGetters(["suggestedPlace","latLng"]),
    data() {
        return {
            activetab: '1',
            cityInfo: null,
            loading: false,
            error: null,
        }
    },
    created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData(this.suggestedPlace.name);
  },
    methods: {
        fetchData(name) {
            this.error = this.cityInfo = null
            this.loading = true
            const queryDispatcher = new SPARQLQueryDispatcher();
            queryDispatcher.getCityInfo(name)
                .then(response => {
                    this.loading = false;
                    this.cityInfo = {...response.results.bindings[0], name};
                });
        }
    },
    watch: {
        suggestedPlace(place) {
            this.fetchData(place.name);
        }
    }
}
</script>

<style>
.container {
    position: absolute;
    top: 50px;
    z-index: 999;
    max-width: 620px; 
    margin: 40px auto;
    font-family: "Nunito Sans", Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
}

/* Style the tabs */
.tabs {
    overflow: hidden;
    margin-bottom: -2px; /* hide bottom border */
    margin-left: 24px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}

/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

.content {
    background-color: white;
}

/* Style the tab content */
.tabcontent {
    padding: 30px 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.tabcontent td {
  padding: 0.3em 0.4em;
  color: #484848;
}
.tabcontent td.legend { 
  color: #888; 
  font-weight: bold;
  text-align: right;
}
.tabcontent .map {
  height: 173px;
  width: 220px;
  background: #D3EAFB;
  margin-left: 60px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.data { width: 120px; }
</style>