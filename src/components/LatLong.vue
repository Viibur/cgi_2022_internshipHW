<template>
    <div class="userInput">
    <form>
        <table class="inputTable">
            <tr>
                <td><label for="latitude">Geograafiline laius:</label> </td>
                <td><el-input-number id="latitude" :min="-90" :max="90" :controls="false" v-model="latitude" /> </td>
            </tr>
            <tr>
                <td><label for="longitude">Geograafiline pikkus:</label> </td>
                <td><el-input-number id="longitude" :min="-180" :max="180" :controls="false" v-model="longitude" /> </td>
            </tr>
            <tr>
                <td><label for="datePickerCalculator">Kuupäev:</label></td>
                <td> <el-date-picker
                    id = "datePickerCalculator"
                    v-model="date"
                    type="date"
                    :clearable="false"
                    placeholder="Vali kuupäev"
                    border:none
                >
                </el-date-picker> </td>
            </tr>
        </table> <br>
    <button type="button" v-on:click="nightLengthAstronomical();setMapScreen();"> Arvuta astronoomiline öö </button><br>
    <button class="lowerButton" type="button" v-on:click="nightLengthSunsetToSunrise();setMapScreen();"> Arvuta horisondi suhtes öö </button>
    </form>
    <p>  {{ nightLengthPrev }} </p>
    <p> {{ nightLengthCurr }} </p>
    <MapElem v-on:mapcords="cordsFromMap" ref="map" />
    </div>
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
        latitude: 58.38156156810358,
        longitude: 26.73048025196609,
        date: new Date(), 
        nightLengthPrev: null,
        nightLengthCurr: null,
        mapcords: {lat: 58.38156156810358, lng: 26.73048025196609},
        lastButtonClicked: "astronomical", //Can be 'astronomical' or 'horizon' based on the last button clicked
        }),
    methods: {
        /**
         * Method for calculating astronomical night length
         * Calculates two night lengths (night ends given date and night starts given date)
         */
        nightLengthAstronomical() {
            this.lastButtonClicked = "astronomical"
            this.latitude = parseFloat(this.latitude)
            this.longitude = parseFloat(this.longitude)

            //Night length for the night that ended at the given date
            const nightBeginYesterday = new Date(this.date.getTime())
            const nightEndToday = new Date(this.date.getTime() + 86400000)
            const startTimeYesterday = SunCalc.getTimes(nightBeginYesterday,this.latitude,this.longitude).nauticalDusk
            const endTimeToday = SunCalc.getTimes(nightEndToday,this.latitude,this.longitude).nauticalDawn
            this.nightLengthPrev = "Astronoomiline öö"+this.formatAnswer(startTimeYesterday,endTimeToday)

            //Night length for the night that starts from the given date
            const nightBeginToday = new Date(this.date.getTime() + 86400000)
            const nightEndTomorrow = new Date(this.date.getTime() + 2*86400000)
            const startTimeToday = SunCalc.getTimes(nightBeginToday,this.latitude,this.longitude).nauticalDusk
            const endTimeTomorrow = SunCalc.getTimes(nightEndTomorrow,this.latitude,this.longitude).nauticalDawn
            this.nightLengthCurr = "Astronoomiline öö"+this.formatAnswer(startTimeToday,endTimeTomorrow)
        },
        /**
         * Method for calculating night length sunrise to sunset
         * Calculates two night lengths (night ends given date and night starts given date)
         */
        nightLengthSunsetToSunrise() {
            this.lastButtonClicked = "horizon"
            this.latitude = parseFloat(this.latitude)
            this.longitude = parseFloat(this.longitude)

            //Night length for the night that ended at the given date
            const nightBeginYesterday = new Date(this.date.getTime())
            const nightEndToday = new Date(this.date.getTime() + 86400000)
            const startTimeYesterday = SunCalc.getTimes(nightBeginYesterday,this.latitude,this.longitude).sunset
            const endTimeToday = SunCalc.getTimes(nightEndToday,this.latitude,this.longitude).sunrise
            this.nightLengthPrev = "Horisondi suhtes öö"+this.formatAnswer(startTimeYesterday,endTimeToday)

            //Night length for the night that starts from the given date
            const nightBeginToday = new Date(this.date.getTime() + 86400000)
            const nightEndTomorrow = new Date(this.date.getTime() + 2*86400000)
            const startTimeToday = SunCalc.getTimes(nightBeginToday,this.latitude,this.longitude).sunset
            const endTimeTomorrow = SunCalc.getTimes(nightEndTomorrow,this.latitude,this.longitude).sunrise
            this.nightLengthCurr = "Horisondi suhtes öö"+this.formatAnswer(startTimeToday,endTimeTomorrow)
        },
        /**
         * Abimeetod kahe kuupäeva vahelise hh:mm vahe arvutamiseks
         */
        dateDiff(dateBegin, dateEnd){
            const duration = dateEnd.getTime() - dateBegin.getTime()
            const minutes = Math.floor((duration / (1000 * 60)) % 60)
            const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
            return hours.toString().padStart(2,"0") + ":" + minutes.toString().padStart(2,"0");
        },
        // Method for formatting answer between two dates
        formatAnswer(startTime,endTime){
            const startHour = startTime.getHours()
            const startMinute = startTime.getMinutes()
            const endHour = endTime.getHours()
            const endMinute =  endTime.getMinutes()
            if (isNaN(startHour) || isNaN(endHour)) return " puudub etteantud kuupäeval"

            return " kuupäevade " + startTime.getDate().toString().padStart(2,"0")+":"+startTime.getMonth().toString().padStart(2,"0") +
                    " - "+ endTime.getDate().toString().padStart(2,"0")+":"+endTime.getMonth().toString().padStart(2,"0")+
                    " vahel on ajavahemikus " +
                    startHour.toString().padStart(2,"0") + ":" + startMinute.toString().padStart(2,"0") +
                    " - " + endHour.toString().padStart(2,"0") + ":" + endMinute.toString().padStart(2,"0") +
                    " ning kestab " +
                    this.dateDiff(startTime,endTime) +
                    " tundi"
        },
        /**
         * Method for getting coordinates from Google map and calulating last clickked button data
         */
        cordsFromMap(center){
            this.latitude = center.lat
            this.longitude = center.lng
            if (this.lastButtonClicked === "astronomical") this.nightLengthAstronomical();
            else this.nightLengthSunsetToSunrise();
        },
        /**
         * Method for setting map cordinates from user input
         */
        setMapScreen(){
            this.mapcords.lat = this.latitude
            this.mapcords.lng = this.longitude
            this.$refs.map.change(this.mapcords)
        }
    },
    mounted(){
        //On load data and map cords
        this.nightLengthAstronomical()
        this.$refs.map.change(this.mapcords)
    },
};
</script>

<style scoped>
.userInput{
    text-align: left;
}
.inputTable{
    text-align: left;
    border-spacing: 0;
    margin-left: 0;
}
.lowerButton{
    margin-top: 5px;
}
</style>