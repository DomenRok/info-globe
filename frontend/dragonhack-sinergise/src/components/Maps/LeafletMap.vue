<template>
    <div class="map-container">
        <l-map class="map-component" :zoom="zoom" :center="center">
            <l-control-layers position="topright"></l-control-layers>
            <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base"/>
        </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer, LControlLayers } from 'vue2-leaflet';
import {
  mapGetters
} from "vuex";

export default {
    name: 'MyAwesomeMap',
    components: {
        LMap,
        LTileLayer,
        LControlLayers
    },
    computed: mapGetters(["suggestedPlace","latLng"]),
    
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 14,
            center: [47.313220, -1.319482],
            tileProviders: 
            [
                {
                name: 'OpenStreetMap',
                visible: true,
                attribution:
                    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                },
                {
                name: 'OpenTopoMap',
                visible: false,
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution:
                    'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                },
            ]
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