<template>
    <div class="map-container">
        <l-map class="map-component" style="height: 350px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
        </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';

export default {
    name: 'MyAwesomeMap',
    components: {
        LMap,
        LTileLayer
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 8,
            center: [47.313220, -1.319482],
            value: "test"
        }
    } 
}
</script>

<style scoped>
    .map-component {
        top: 0;
        bottom: 0;
        width: 100%;
    }

</style>