<template>
    <div class="map-container">
        <l-map class="map-component" 
        :zoom="zoom" 
        :center="center" 
        v-if="rerender" 
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate">
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
    location: null,
    name: 'MyAwesomeMap',
    components: {
        LMap,
        LTileLayer,
        'l-wms-tile-layer': LWMSTileLayer,
        LControlLayers
    },
    methods: {
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
        },
    },
    computed: mapGetters(["suggestedPlace","latLng","getDate"]),
    
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            baseUrl: 'https://services.sentinel-hub.com/ogc/wms/e71da4bc-7306-43bf-b505-b60d2470912e',
            zoom: 14,
            rerender:true,
            center: [47.313220, -1.319482],
            currentCenter: [],
            currentZoom: 0,
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
                    name:"Water",
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
                        upsampling:'bicubic',
                        downsampling:'bicubic'
                    }
                },
                {
                    name:"WildFire",
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
                },
                {
                    name:"UrbanInfraRed",
                    tileSize: 512,
                    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                    urlProcessingApi:'https://services.sentinel-hub.com/ogc/wms/aeafc74a-c894-440b-a85b-964c7b26e471',
                    visible: false, 
                    maxcc:100, 
                    minZoom:6, 
                    maxZoom:16, 
                    preset:'URBAN-INFRARED', 
                    layers:'URBAN-INFRARED', 
                    sinergiseSpecifika: {
                        time:'2018-09-01T00:00:00Z/2019-03-04T23:59:59Z'
                    }
                },
                {
                    name:"GreenCity",
                    tileSize: 512,
                    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                    urlProcessingApi:'https://services.sentinel-hub.com/ogc/wms/aeafc74a-c894-440b-a85b-964c7b26e471',
                    visible: false, 
                    maxcc:100, 
                    minZoom:6, 
                    maxZoom:16, 
                    preset:'GREEN-CITY', 
                    layers:'GREEN-CITY', 
                    sinergiseSpecifika: {
                        upsampling:'bicubic',
                        downsampling:'bicubic'

                    }
                }
            ]
        }
    },
    watch: {
        latLng (newLatLng) {
            this.center = newLatLng
            this.zoom = 14
        },
        async getDate (newDate) {
            let startDate = new Date(newDate[0])
            let endDate = new Date(newDate[1])
            if(endDate-startDate >= 0){
                this.rerender = await false;
                let concatDate = '' + newDate[0] + '/' + newDate[1]

                let waterLayer = {
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
                        time: concatDate
                    }
                }

                this.$set(this.layers, 0, waterLayer);

                let fireLayer = {
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
                        time:concatDate
                    }
                }

                let urbanLayer = {
                    name:"UrbanInfraRed",
                    tileSize: 512,
                    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                    urlProcessingApi:'https://services.sentinel-hub.com/ogc/wms/aeafc74a-c894-440b-a85b-964c7b26e471',
                    visible: false, 
                    maxcc:100, 
                    minZoom:6, 
                    maxZoom:16, 
                    preset:'URBAN-INFRARED', 
                    layers:'URBAN-INFRARED', 
                    sinergiseSpecifika: {
                        time:concatDate
                    }
                }
                this.center = this.currentCenter;
                this.zoom = this.currentZoom;
                this.$set(this.layers, 1, fireLayer);
                await this.$set(this.layers, 2, urbanLayer);
                this.rerender = true;
            }
        }
    },
    created() {
    //do we support geolocation
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    let center = [latitude, longitude]
    this.center = center;
      this.gettingLocation = false;
      this.location = pos;
    console.log(this.center);
    console.log(pos);
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
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