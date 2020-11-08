<template>
  <div id="tabs" class="container">
      <div class="tabs">
        <a v-on:click="activetab='1'" v-bind:class="[ activetab === '1' ? 'active' : '' ]">Wiki info</a>
        <a v-on:click="activetab='2'" v-bind:class="[ activetab === '2' ? 'active' : '' ]">Hide</a>
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
              <tr v-if="cityInfo.area && cityInfo.locator">
                  <td class="legend">Area:</td><td class="data">{{cityInfo.area.value}} km<sup>2</sup></td>
                  <td v-if="cityInfo.locator" rowspan="5"><img class="map" :src="cityInfo.locator.value"></td>
              </tr>
              <tr v-if="cityInfo.population"><td class="legend">Population:</td><td class="data">{{cityInfo.population.value}} million</td></tr>
              <tr v-if="cityInfo.name"><td class="legend">Capital:</td><td class="data">{{cityInfo.name}}</td></tr>
              <tr v-if="cityInfo.countryLabel"><td class="legend">Language:</td><td class="data">{{cityInfo.countryLabel.value}}</td></tr>
              <tr v-if="cityInfo.flag">
                  <td class="legend" valign="top">Flag:</td><td class="data">
                  <img class="flag" :src="cityInfo.flag.value" width="80"></td>
            </tr>
            </table>
            <div v-if="cityInfo.geoshape" class="summary">
                {{cityInfo.geoshape.value}}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    this.suggestedPlace && this.fetchData(this.suggestedPlace.name);
  },
    methods: {
        ...mapActions(["addGeoPolygon"]),
        fetchData(name) {
            this.error = this.cityInfo = null
            this.loading = true
            const queryDispatcher = new SPARQLQueryDispatcher();
            queryDispatcher.getCityInfo(name)
                .then(response => {
                    this.loading = false;
                    const firstResult = response.results.bindings[0];
                    this.cityInfo = {...firstResult, name};
                });
            name && fetch(`https://nominatim.openstreetmap.org/search.php?q=${name}&polygon_geojson=1&format=json`)
                        .then(geoObj =>  geoObj.json())
                        .then(json => {
                            console.log("vsi geojson podatki", json);
                            this.addGeoPolygon(json[0].geojson.coordinates);
                        });
        }
    },
    watch: {
        suggestedPlace(place) {
            place.name && this.fetchData(place.name);
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