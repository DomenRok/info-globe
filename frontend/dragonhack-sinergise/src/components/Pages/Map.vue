<template>
    <div>
        <div class="search-container">
            <PlacesSearch />
        </div>
        <div class="p-grid">
            <div class="p-col-2">

            </div>
            <div class="map-container p-col-10">
                <leaflet-map />
            </div>
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
    .search-conatiner{
        height: 20vh;
    }
    .map-conainer {
        height: 80vh;
    }
</style>