<template> 
  <div>
    <table id="mapsTable">
      <tr>
        <td />
          <td>
            <label>Terminaator joone kuupäeva ja kellaaeg: </label>
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
                :zoom="6.8"
                map-type-id="terrain"
                style="width: 39vw; height: 315px;text-align:left;"
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
    /**
     * Meetod nii Google map-i kui ka selle markeri asukoha muutmiseks (kui kasutaja manuaaselt kordinaate muudab)
     */
      change(mapcords){
        this.centerMap.lat = mapcords.lat
        this.centerMap.lng = mapcords.lng
        this.centerMarker.lat = mapcords.lat
        this.centerMarker.lng = mapcords.lng
      },
      /**
       * Meetod Google map-i kordinaatide ahelas üles LatLong-ile emittimiseks
       */
      toParent(event){
          this.centerMarker.lat = event.latLng.lat()
          this.centerMarker.lng = event.latLng.lng()
          this.$emit('mapcords',this.centerMarker)
      },
      /**
       * Meetod terminaator joone mapi kuvatava kuupäeva ja kellaaja muutmiseks 
       */
      onTermDateChange(){
          this.terminator.setTime(this.date)
      }
  },
  /**
   * Esmalt komponent renderdades loo Leaflet map ja pane sinna terminator(öö/päeva piirjoon) layer peale
   */
  mounted() {
    this.leafletMap = L.map("mapContainer").setView([15,30], 1);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.leafletMap);
    this.terminator = terminator().addTo(this.leafletMap)
  },
}
</script>
<style scoped>
#mapContainer {
    width: 39vw; 
    height: 315px;
    margin:0 auto;
}
#mapsTable{
    text-align: left;
    border-spacing: 0;
}
</style>