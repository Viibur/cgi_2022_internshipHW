<template> 
  <div class="mapsContainer">
    <div>
      <GMapMap
        :center="centerMap"
        :zoom="6.8"
        map-type-id="terrain"
        style="width: 38vw; height: 315px;text-align:left;"
        @click="toParent"
      >
      <GMapMarker
        :position="centerMarker"
      />
      </GMapMap>
    </div>
    <div>
      <label>Terminaator joone kuupäeva ja kellaaeg: </label>
      <el-date-picker
        v-model="date"
        type="datetime" 
        :clearable="false"
        placeholder="Vali kuupäev"
        border:none
        @change="onTermDateChange()"
        />
      <div id="mapContainer"></div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import terminator from '@joergdietrich/leaflet.terminator';
export default {
  name: 'App',
  data() {
    return {
      centerMap: {lat: null, lng: null},
      centerMarker: {lat: null, lng: null},
      leafletMap: null,
      date: new Date(),
      terminator: null,
    }
  },
  methods: {
      // Method for changing map and marker coordinates with user input
      change(mapcords){
        this.centerMap.lat = mapcords.lat
        this.centerMap.lng = mapcords.lng
        this.centerMarker.lat = mapcords.lat
        this.centerMarker.lng = mapcords.lng
      },
      // Method for emitting map coordinates to parent component
      toParent(event){
          this.centerMarker.lat = event.latLng.lat()
          this.centerMarker.lng = event.latLng.lng()
          this.$emit('mapcords',this.centerMarker)
      },
      // Method for changing terminator date time display
      onTermDateChange(){
          this.terminator.setTime(this.date)
      }
  },
  //Upon loading render leaflet map with the terminator layer
  mounted() {
    this.leafletMap = L.map("mapContainer").setView([15,30], 1);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.leafletMap);
    this.leafletMap.touchZoom.disable();
    this.leafletMap.doubleClickZoom.disable();
    this.terminator = terminator().addTo(this.leafletMap)
  },
}
</script>
<style scoped>
#mapContainer {
    width: 38vw;
    height: 315px;
    margin-left: 0;
}
.mapsContainer{
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
}
</style>