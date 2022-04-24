<template>
  <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 40vw; height: 320px"
      @click="toParent"
  >
  <GMapMarker
    :position="center"
  />
  </GMapMap>
</template>

<script >
export default {
  name: 'App',
  data() {
    return {
      center: {lat:  59.196341034825565, lng: 24.831462479017766},
    }
  },
  methods: {
      change(mapcords){
          this.center.lat = mapcords.lat
          this.center.lng = mapcords.lng
      },
      toParent(event){
          this.center.lat = event.latLng.lat()
          this.center.lng = event.latLng.lng()
          this.$emit('mapcords',this.center)
      }
  }
}
</script>