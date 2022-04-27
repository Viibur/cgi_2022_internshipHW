<template>
    <div id="content">
    <form>
        <table id="inputTable">
            <tr>
                <td><label for="lat">Geograafiline laius:</label> </td>
                <td><el-input-number id="lat" :min="-90" :max="90" :controls="false" v-model="latitude" /> </td>
            </tr>
            <tr>
                <td><label for="lng">Geograafiline pikkus:</label> </td>
                <td><el-input-number id="lng" :min="-180" :max="180" :controls="false" v-model="longitude" /> </td>
            </tr>
            <tr>
                <td><label for="kuupaev">Kuupäev:</label></td>
                <td> <el-date-picker
                    id = "kuupaev"
                    v-model="date"
                    type="date"
                    :clearable="false"
                    placeholder="Vali kuupäev"
                    border:none
                >
                </el-date-picker> </td>
            </tr>
        </table> <br>
    <button type="button" v-on:click="nightLengthAst();setMapScreen()"> Arvuta astronoomiline öö </button><br>
    <button id="alumine" type="button" v-on:click="nightLengthStS();setMapScreen()"> Arvuta horisondi suhtes öö </button>
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
        lastButtonClicked: "astronoomiline", //Võib olla kas "astronoomiline" või "horisont" vastavalt mis nuppu viimati vajutati
        }),
    methods: {
        /**
         * Meetod astronoomilise öö pikkuse arvutamiseks, kastuab kasutaja etteantud väärtusi või default (Tartu, hetkekuupäev)
         * Arvutab nii tänasega lõppeva, kui ka tänasega algava öö pikkuse
         */
        nightLengthAst() {
            this.lastButtonClicked = "astronoomiline"
            this.latitude = parseFloat(this.latitude)
            this.longitude = parseFloat(this.longitude)

            //Tänase kuupäevaga läbi saanud öö pikkuse arvutamiseks
            let nightBeginYesterday = new Date(this.date.getTime())
            let nightEndToday = new Date(this.date.getTime() + 86400000)
            let startTimeYesterday = SunCalc.getTimes(nightBeginYesterday,this.latitude,this.longitude).nauticalDusk
            let endTimeToday = SunCalc.getTimes(nightEndToday,this.latitude,this.longitude).nauticalDawn
            this.nightLengthPrev = "Astronoomiline öö"+this.formatAnswer(startTimeYesterday,endTimeToday)

            //Tänase kuupäevaga algava öö pikkuse arvutamiseks
            let nightBeginToday = new Date(this.date.getTime() + 86400000)
            let nightEndTomorrow = new Date(this.date.getTime() + 2*86400000)
            let startTimeToday = SunCalc.getTimes(nightBeginToday,this.latitude,this.longitude).nauticalDusk
            let endTimeTomorrow = SunCalc.getTimes(nightEndTomorrow,this.latitude,this.longitude).nauticalDawn
            this.nightLengthCurr = "Astronoomiline öö"+this.formatAnswer(startTimeToday,endTimeTomorrow)
        },
        /**
         * Meetod horisondi suhtes öö pikkuse arvutamiseks, kastuab kasutaja etteantud väärtusi või default (Tartu, hetkekuupäev)
         * Arvutab nii tänasega lõppeva, kui ka tänasega algava öö pikkuse
         */
        nightLengthStS() {
            this.lastButtonClicked = "horisont"
            this.latitude = parseFloat(this.latitude)
            this.longitude = parseFloat(this.longitude)

            //Tänase kuupäevaga läbi saanud öö pikkuse arvutamiseks
            let nightBeginYesterday = new Date(this.date.getTime())
            let nightEndToday = new Date(this.date.getTime() + 86400000)
            let startTimeYesterday = SunCalc.getTimes(nightBeginYesterday,this.latitude,this.longitude).sunset
            let endTimeToday = SunCalc.getTimes(nightEndToday,this.latitude,this.longitude).sunrise
            this.nightLengthPrev = "Horisondi suhtes öö"+this.formatAnswer(startTimeYesterday,endTimeToday)

            //Tänase kuupäevaga algava öö pikkuse arvutamiseks
            let nightBeginToday = new Date(this.date.getTime() + 86400000)
            let nightEndTomorrow = new Date(this.date.getTime() + 2*86400000)
            let startTimeToday = SunCalc.getTimes(nightBeginToday,this.latitude,this.longitude).sunset
            let endTimeTomorrow = SunCalc.getTimes(nightEndTomorrow,this.latitude,this.longitude).sunrise
            this.nightLengthCurr = "Horisondi suhtes öö"+this.formatAnswer(startTimeToday,endTimeTomorrow)
        },
        /**
         * Abimeetod kahe kuupäeva vahelise hh:mm vahe arvutamiseks
         */
        dateDiff(dateBegin, dateEnd){
            let duration = dateEnd.getTime() - dateBegin.getTime()
            var minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            return hours.toString().padStart(2,"0") + ":" + minutes.toString().padStart(2,"0");
        },
        /**
         * Abimeetod kahe kuupäeva vahelise aja vastuseks formattimiseks
         */
        formatAnswer(startTime,endTime){
            var startHour = startTime.getHours(),
                startMinute = startTime.getMinutes(),
                endHour = endTime.getHours(),
                endMinute =  endTime.getMinutes()
            if (isNaN(startHour) || isNaN(endHour)) return "puudub etteantud kuupäeval"

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
         * Meetod google mapilt kordinaatide saamiseks ja viimati oleva nupu vajutuse järgi 
         * Kasutajale vastuse kuvamine
         */
        cordsFromMap(center){
            this.latitude = center.lat
            this.longitude = center.lng
            if (this.lastButtonClicked === "astronoomiline") this.nightLengthAst();
            else this.nightLengthStS();
        },
        /**
         * Meetod mis muudab käsitsi lat/lng inputi muutmisel ka mapi kordinaate
         */
        setMapScreen(){
            this.mapcords.lat = this.latitude
            this.mapcords.lng = this.longitude
            this.$refs.map.change(this.mapcords)
        }
    },
    mounted(){
        //Esialgse vastuse ja mapi paika panemiseks
        this.nightLengthAst()
        this.$refs.map.change(this.mapcords)
    },
};
</script>

<style scoped>
#content{
    text-align: left;
}
#inputTable{
    text-align: left;
    border-spacing: 0;
    margin-left: 0;
}
#inputtable td{
    padding: 10px 20px;
    border: 1px solid #000;
    text-align: left;
}
#alumine{
    margin-top: 5px;
}
</style>