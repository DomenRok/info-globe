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
             <l-wms-tile-layer
                v-for="layer in layers"
                :key="layer.name"
                :base-url="baseUrl"
                :layers="layer.layers"
                :visible="layer.visible"
                :name="layer.name"
                :options="layer.sinergiseSpecifika"
                layer-type="base"

                />

        </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer, LWMSTileLayer, LControlLayers } from 'vue2-leaflet';
import {
  mapGetters
} from "vuex";

export default {
    name: 'MyAwesomeMap',
    components: {
        LMap,
        LTileLayer,
        'l-wms-tile-layer': LWMSTileLayer,
        LControlLayers
    },
    computed: mapGetters(["suggestedPlace","latLng"]),
    
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            baseUrl: 'https://services.sentinel-hub.com/ogc/wms/e71da4bc-7306-43bf-b505-b60d2470912e',
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
            ],
            layers:
            [
                {
                    name:"Sentinel-Water",
                    tileSize: 512,
                    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                    urlProcessingApi:'https://services.sentinel-hub.com/ogc/wms/aeafc74a-c894-440b-a85b-964c7b26e471',
                    visible: false, 
                    maxcc:20, 
                    minZoom:6, 
                    maxZoom:16, 
                    preset:'TEST', 
                    layers:'TEST',
                    sinergiseSpecifika: {
                        time:'2018-05-01/2020-11-07'
                    }
                },
                {
                    name:"Sentinel-WildFire",
                    tileSize: 512,
                    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                    urlProcessingApi:'https://services.sentinel-hub.com/ogc/wms/aeafc74a-c894-440b-a85b-964c7b26e471',
                    visible: false, 
                    maxcc:100, 
                    minZoom:6, 
                    maxZoom:16, 
                    preset:'WILDFIRE', 
                    layers:'WILDFIRE', 
                    sinergiseSpecifika: {
                        time:'2018-09-01T00:00:00Z/2019-03-04T23:59:59Z'
                    }
                }
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
        height: 100vh;
    }

</style>