<template>
<table id="mapsTable">
  <tr>
    <td />
      <td>
        <el-date-picker
          id = "kuupaev ja kellaaeg"
          v-model="date"
          type="datetime"
          :clearable="false"
          placeholder="Vali kuupäev"
          border:none
          @change="onTermDateChange()"
          />
        </td>
    </tr>
    <tr>
      <td>
        <GMapMap
            :center="centerMap"
            :zoom="7"
            map-type-id="terrain"
            style="width: 40vw; height: 320px;"
            @click="toParent"
        >
        <GMapMarker
          :position="centerMarker"
        />
        </GMapMap>
     </td>
     <td> <div id="mapContainer"></div></td>
    </tr>
  </table>
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
      change(mapcords){
        this.centerMap.lat = mapcords.lat
        this.centerMap.lng = mapcords.lng
          this.centerMarker.lat = mapcords.lat
          this.centerMarker.lng = mapcords.lng
      },
      toParent(event){
          this.centerMarker.lat = event.latLng.lat()
          this.centerMarker.lng = event.latLng.lng()
          this.$emit('mapcords',this.centerMarker)
      },
      onTermDateChange(){
          this.terminator.setTime(this.date)
      }
  },
  mounted() {
    this.leafletMap = L.map("mapContainer").setView([0,0], 1);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.leafletMap);
    this.terminator = terminator().addTo(this.leafletMap)
  },
}
</script>
<style scoped>
#mapContainer {
    width: 40vw; 
    height: 320px;
    margin:0 auto;
}
#mapsTable{
    align-content: center;
    border-spacing: 0;
    margin-left:auto; 
    margin-right:auto;
}
</style>