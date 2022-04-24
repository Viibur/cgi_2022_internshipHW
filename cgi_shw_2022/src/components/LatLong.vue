<template>
    <form>
    <label>Latitude:</label>
    <el-input-number :min="-90" :max="90" :controls="false" v-model="latitude" /><br>

    <label>Longitude:</label>
    <el-input-number :min="-180" :max="180" :controls="false" v-model="longitude" /><br>

    <label for="datepicker">Date:</label>
    <el-date-picker
        v-model="date"
        type="date"
        :clearable="false"
        placeholder="Vali kuupäev"
      >
      </el-date-picker><br><br>
    <button type="button" v-on:click="nightLength()"> Calculate </button>
    </form>
    <p>  {{ nightLengthPrev }} </p>
    <p> {{ nightLengthCurr }} </p>
    <MapElem v-on:mapcords="cordsFromMap" ref="map" />
</template>

<script>
import MapElem from './MapElem.vue'
var SunCalc = require('suncalc');
export default {
    name: 'LatLong',
    components: {
        MapElem,
    },
    data: ()=>({
            latitude: 59.196341034825565,
            longitude: 24.831462479017766,
            date: null, //default is current date
            nightLengthPrev: null,
            nightLengthCurr: null,
            mapcords: {lat: 59.196341034825565, lng: 24.831462479017766}
        }),
    methods: {
        nightLength() {
            this.latitude = parseFloat(this.latitude)
            this.longitude = parseFloat(this.longitude)

            let nightBeginYesterday = new Date(this.date.getTime())
            let nightEndToday = new Date(this.date.getTime() + 86400000)
            let startTimeYesterday = SunCalc.getTimes(nightBeginYesterday,this.latitude,this.longitude).nauticalDusk
            let endTimeToday = SunCalc.getTimes(nightEndToday,this.latitude,this.longitude).nauticalDawn
            this.nightLengthPrev = this.formatAnswer(startTimeYesterday,endTimeToday)

            let nightBeginToday = new Date(this.date.getTime() + 86400000) //el-date-picker tagastab imelikult, lisa päev, et täna saada
            let nightEndTomorrow = new Date(this.date.getTime() + 2*86400000)
            let startTimeToday = SunCalc.getTimes(nightBeginToday,this.latitude,this.longitude).nauticalDusk
            let endTimeTomorrow = SunCalc.getTimes(nightEndTomorrow,this.latitude,this.longitude).nauticalDawn
            this.nightLengthCurr = this.formatAnswer(startTimeToday,endTimeTomorrow)
            
            this.mapcords.lat = this.latitude
            this.mapcords.lng = this.longitude
            this.$refs.map.change(this.mapcords)
        },
        timeDiff(dateBegin, dateEnd){
            let duration = dateEnd.getTime() - dateBegin.getTime()
            var minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            return hours.toString().padStart(2,"0") + ":" + minutes.toString().padStart(2,"0");
        },
        formatAnswer(startTime,endTime){
            var startHour = startTime.getHours(),
                startMinute = startTime.getMinutes(),
                endHour = endTime.getHours(),
                endMinute =  endTime.getMinutes()
            if (isNaN(startHour) || isNaN(endHour)) return "Astronoomiline öö puudub"

            return "Astronoomiline öö kuupäevade " + startTime.getDate().toString().padStart(2,"0")+":"+startTime.getMonth().toString().padStart(2,"0") +
                    " - "+ endTime.getDate().toString().padStart(2,"0")+":"+endTime.getMonth().toString().padStart(2,"0")+
                    " vahel on ajavahemikus " +
                    startHour.toString().padStart(2,"0") + ":" + startMinute.toString().padStart(2,"0") +
                    " - " + endHour.toString().padStart(2,"0") + ":" + endMinute.toString().padStart(2,"0") +
                    " ning kestab " +
                    this.timeDiff(startTime,endTime) +
                    " tundi"
        },
        cordsFromMap(center){
            this.latitude = center.lat
            this.longitude = center.lng
            this.nightLength()
        }
    },
};
</script>