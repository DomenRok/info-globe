<template>
    <div class="map-container">
        <l-map class="map-component" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
        </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';
import {
  mapGetters
} from "vuex";

export default {
    name: 'MyAwesomeMap',
    components: {
        LMap,
        LTileLayer
    },
    computed: mapGetters(["suggestedPlace","latLng"]),
    
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 14,
            center: [47.313220, -1.319482]
        }
    },
    watch: {
        latLng (newLatLng) {
            this.center = newLatLng
        }
    }
}
</script>

<style scoped>
    .map-component {
        top: 0;
        bottom: 0;
        height: 80vh;
    }

</style>