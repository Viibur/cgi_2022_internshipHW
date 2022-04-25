<template>
  <GMapMap
      :center="centerMap"
      :zoom="7"
      map-type-id="terrain"
      style="width: 40vw; height: 320px; margin:0 auto;"
      @click="toParent"
  >
  <GMapMarker
    :position="centerMarker"
  />
  </GMapMap>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      centerMap: {lat: null, lng: null},
      centerMarker: {lat: null, lng: null},
    }
  },
  methods: {
      change(mapcords){
          this.centerMarker.lat = mapcords.lat
          this.centerMarker.lng = mapcords.lng
      },
      toParent(event){
          this.centerMarker.lat = event.latLng.lat()
          this.centerMarker.lng = event.latLng.lng()
          this.$emit('mapcords',this.centerMarker)
      },
      onLoad(mapcords){
        this.centerMap.lat = mapcords.lat
        this.centerMap.lng = mapcords.lng
      }
  },
}
</script>