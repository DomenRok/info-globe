<template>
    <div class="map-container">
        <div class="overlay-container p-grid p-nogutter">
                <PlacesSearch />
            <div>

            </div>
        </div>
        <div>
            <leaflet-map class="map-component" />
        </div>
    </div>
</template>

<script>
import LeafletMap from '../Maps/LeafletMap.vue'
import PlacesSearch from '../Places/PlacesSearch';

export default {
name: "MapPage",
components: {
    LeafletMap,
    PlacesSearch
  }
}
</script>

<style>
    .overlay-conatiner{
        z-index: 500;    
        position: absolute;
        }
    .map-component {
        z-index: 0;
    }
    .map-conainer {
        height: 100vh;
        z-index: 0;
        position: relative;
    }
</style>